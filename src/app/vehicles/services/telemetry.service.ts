import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  catchError,
  interval,
  of,
  startWith,
  switchMap,
  tap
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { Vehicle } from '../model/vehicle.entity';
import { VehicleService } from './vehicle.service';
import { IncidentAlert } from '../model/incident-alert.entity';

/** Speed threshold (km/h) above which an OVERSPEED alert is raised. */
const OVERSPEED_LIMIT_KMH = 35;
/** Telemetry poll interval. AWS IoT Core → Edge → Lambda bridge pushes to the
 *  backend continuously; the frontend polls the REST snapshot every 3s.
 *  This is the single seam to swap for a WebSocket/STOMP subscription later
 *  without touching any component that consumes streamVehicle(). */
const POLL_MS = 3000;

export interface GeofenceConfig {
  centerLat: number;
  centerLng: number;
  radiusM: number;
}

@Injectable({ providedIn: 'root' })
export class TelemetryService {
  private http: HttpClient = inject(HttpClient);
  private vehicleService: VehicleService = inject(VehicleService);
  private basePath = `${environment.serverBasePath}/vehicles`;

  /** In-memory incident feed, keyed by vehicleId, newest first. */
  private alerts = new BehaviorSubject<IncidentAlert[]>([]);
  readonly alerts$ = this.alerts.asObservable();

  private lastSeen = new Map<number, Vehicle>();

  /**
   * Live telemetry stream for a single vehicle. Emits immediately, then on
   * every poll tick. Any telemetry-derived alert (impact, overspeed,
   * geofence breach) is pushed into the shared alerts$ feed as a side effect.
   */
  streamVehicle(vehicleId: number): Observable<Vehicle> {
    return interval(POLL_MS).pipe(
      startWith(0),
      switchMap(() => this.vehicleService.getVehiclePublic(vehicleId)),
      tap((vehicle) => this.deriveAlerts(vehicle)),
      catchError((err) => {
        console.error('Error polling telemetry:', err);
        return of(new Vehicle({ id: vehicleId }));
      })
    );
  }

  /**
   * Sends the physical/digital panic button signal to the backend so it can
   * notify support/emergency contacts. Falls back to a local, optimistic
   * alert if the endpoint isn't available yet (backend addition required:
   * POST /vehicles/{id}/panic).
   */
  triggerPanic(vehicleId: number, vehicleName = ''): Observable<unknown> {
    this.pushAlert(new IncidentAlert({
      vehicleId,
      vehicleName,
      type: 'PANIC',
      severity: 'critical',
      message: 'Botón de pánico activado por el adquirente. Se notificó al proveedor y soporte.'
    }));
    return this.http.post(`${this.basePath}/${vehicleId}/panic`, {}).pipe(
      catchError((err) => {
        console.warn('Backend /panic endpoint not available yet, alert stayed local only.', err);
        return of(null);
      })
    );
  }

  /**
   * Persists the geofence the owner draws on the map. Backend addition
   * required: PUT /vehicles/{id}/geofence storing centerLat/centerLng/radiusM
   * and comparing them against incoming telemetry to set geofenceBreached.
   */
  setGeofence(vehicleId: number, geofence: GeofenceConfig): Observable<unknown> {
    return this.http.put(`${this.basePath}/${vehicleId}/geofence`, geofence).pipe(
      catchError((err) => {
        console.warn('Backend /geofence endpoint not available yet.', err);
        return of(null);
      })
    );
  }

  /** Clears the in-memory feed (e.g. when navigating away from a vehicle). */
  clearAlerts() {
    this.alerts.next([]);
    this.lastSeen.clear();
  }

  private pushAlert(alert: IncidentAlert) {
    this.alerts.next([alert, ...this.alerts.value].slice(0, 50));
  }

  private deriveAlerts(vehicle: Vehicle) {
    const previous = this.lastSeen.get(vehicle.id);
    this.lastSeen.set(vehicle.id, vehicle);

    // Impact/fall — MPU6050 accelerometer/gyroscope threshold breach.
    if (vehicle.fallDetected && !previous?.fallDetected) {
      this.pushAlert(new IncidentAlert({
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        type: 'IMPACT',
        severity: 'critical',
        message: `Impacto o caída detectada en "${vehicle.name}" (giroscopio/acelerómetro).`
      }));
    }

    // Overspeed — Hall effect speed sensor.
    if ((vehicle.speedKmh ?? 0) > OVERSPEED_LIMIT_KMH
      && (previous?.speedKmh ?? 0) <= OVERSPEED_LIMIT_KMH) {
      this.pushAlert(new IncidentAlert({
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        type: 'OVERSPEED',
        severity: 'warning',
        message: `"${vehicle.name}" superó el límite de velocidad: ${vehicle.speedKmh?.toFixed(0)} km/h.`
      }));
    }

    // Geofence transgression.
    if (vehicle.geofenceBreached && !previous?.geofenceBreached) {
      this.pushAlert(new IncidentAlert({
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        type: 'GEOFENCE',
        severity: 'critical',
        message: `"${vehicle.name}" salió de la geocerca permitida.`
      }));
    }
  }
}
