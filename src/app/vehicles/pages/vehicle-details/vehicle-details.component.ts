import {Component, inject, OnInit, OnDestroy} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UpperCasePipe, DatePipe, NgIf, NgFor, NgClass, DecimalPipe} from "@angular/common";
import {Vehicle} from "../../model/vehicle.entity";
import { VehicleService, TelemetryPoint } from '../../services/vehicle.service';
import {MatCardImage} from "@angular/material/card";
import {RatingModule} from "primeng/rating";
import {HeaderComponent} from "../../../public/components/header/header.component";
import {TranslateModule} from "@ngx-translate/core";
import {GoogleMap, MapMarker, MapPolyline} from "@angular/google-maps";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {ReservationService, Reservation} from '../../../shared/services/reservation.service';
import {TelemetryService} from '../../services/telemetry.service';
import {IncidentAlert} from '../../model/incident-alert.entity';
import {SpeedometerComponent} from '../../components/speedometer/speedometer.component';
import {PanicButtonComponent} from '../../components/panic-button/panic-button.component';
import {IncidentFeedComponent} from '../../../shared/components/incident-feed/incident-feed.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [
    FormsModule, ReactiveFormsModule, MatCardImage, RatingModule,
    UpperCasePipe, DatePipe, DecimalPipe, NgIf, NgFor, NgClass,
    TranslateModule, HeaderComponent, GoogleMap, MapMarker, MapPolyline, RouterLink,
    SpeedometerComponent, PanicButtonComponent, IncidentFeedComponent
  ],
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css'
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {
  protected vehicleData: Vehicle | null = null;
  protected iotLoading = false;
  protected iotError: string | null = null;
  protected reservations: Reservation[] = [];
  protected reservationsLoading = false;
  protected calendarMonth = new Date().getMonth();
  protected calendarYear = new Date().getFullYear();
  protected alerts: IncidentAlert[] = [];
  protected trailPath: google.maps.LatLngLiteral[] = [];
  protected trailOptions: google.maps.PolylineOptions = {
    strokeColor: '#16a34a',
    strokeWeight: 3,
    strokeOpacity: 0.7
  };

  private vehicleService = inject(VehicleService);
  private reservationService = inject(ReservationService);
  private telemetryService = inject(TelemetryService);
  private route = inject(ActivatedRoute);
  private telemetrySub?: Subscription;
  private alertsSub?: Subscription;
  value?: number;

  private get vehicleId(): number {
    const param = this.route.snapshot.paramMap.get('id');
    return param ? +param : 1;
  }

  randomRating() {
    this.value = Math.floor(Math.random() * 6);
  }

  ngOnInit(): void {
    this.randomRating();
    this.loadReservations();
    this.loadTrail();
    this.telemetryService.clearAlerts();
    this.telemetrySub = this.telemetryService.streamVehicle(this.vehicleId)
      .subscribe(v => { this.vehicleData = v; });
    this.alertsSub = this.telemetryService.alerts$.subscribe(a => this.alerts = a);
  }

  ngOnDestroy(): void {
    this.telemetrySub?.unsubscribe();
    this.alertsSub?.unsubscribe();
  }

  loadReservations() {
    this.reservationsLoading = true;
    this.reservationService.getByVehicle(this.vehicleId).subscribe({
      next: (res) => { this.reservations = res; this.reservationsLoading = false; },
      error: () => { this.reservationsLoading = false; }
    });
  }

  loadTrail() {
    this.vehicleService.getTelemetryHistory(this.vehicleId, 200).subscribe({
      next: (points) => {
        // Points come newest-first from the API; reverse for chronological order on map
        this.trailPath = [...points].reverse()
          .filter(p => typeof p.lat === 'number' && isFinite(p.lat)
                    && typeof p.lng === 'number' && isFinite(p.lng))
          .map(p => ({ lat: Number(p.lat), lng: Number(p.lng) }));
      },
      error: () => {}
    });
  }

  get hasTrail(): boolean { return this.trailPath.length > 1; }

  lockVehicle(): void {
    if (!this.vehicleData) return;
    this.iotLoading = true;
    this.iotError = null;
    this.vehicleService.lockVehicle(this.vehicleData.id).subscribe({
      next: (updated) => { this.vehicleData = updated; this.iotLoading = false; },
      error: (err) => { this.iotError = 'Error al bloquear'; this.iotLoading = false; console.error(err); }
    });
  }

  unlockVehicle(): void {
    if (!this.vehicleData) return;
    this.iotLoading = true;
    this.iotError = null;
    this.vehicleService.unlockVehicle(this.vehicleData.id).subscribe({
      next: (updated) => { this.vehicleData = updated; this.iotLoading = false; },
      error: (err) => { this.iotError = 'Error al desbloquear'; this.iotLoading = false; console.error(err); }
    });
  }

  get calendarMonthLabel(): string {
    const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                    'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    return `${months[this.calendarMonth]} ${this.calendarYear}`;
  }

  get calendarDays(): Array<{day: number, dateStr: string, isBooked: boolean, isEmpty: boolean}> {
    const days: Array<{day: number, dateStr: string, isBooked: boolean, isEmpty: boolean}> = [];
    const firstDay = new Date(this.calendarYear, this.calendarMonth, 1);
    const pad = (n: number) => String(n).padStart(2, '0');
    const startPad = (firstDay.getDay() + 6) % 7;
    for (let i = 0; i < startPad; i++) days.push({day: 0, dateStr: '', isBooked: false, isEmpty: true});
    const daysInMonth = new Date(this.calendarYear, this.calendarMonth + 1, 0).getDate();
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${this.calendarYear}-${pad(this.calendarMonth + 1)}-${pad(d)}`;
      const isBooked = this.reservations.some(r =>
        r.status?.toLowerCase() !== 'cancelled' && r.status?.toLowerCase() !== 'deleted' &&
        dateStr >= r.startDate && dateStr <= r.endDate
      );
      days.push({day: d, dateStr, isBooked, isEmpty: false});
    }
    return days;
  }

  prevMonth(): void {
    if (this.calendarMonth === 0) { this.calendarMonth = 11; this.calendarYear--; }
    else this.calendarMonth--;
  }

  nextMonth(): void {
    if (this.calendarMonth === 11) { this.calendarMonth = 0; this.calendarYear++; }
    else this.calendarMonth++;
  }

  get hasIotGps(): boolean {
    return !!(this.vehicleData?.lat && this.vehicleData?.lng
              && this.vehicleData.lat !== 0 && this.vehicleData.lng !== 0);
  }

  get iotMapCenter(): google.maps.LatLngLiteral {
    return this.hasIotGps
      ? { lat: this.vehicleData!.lat, lng: this.vehicleData!.lng }
      : { lat: -12.0464, lng: -77.0428 };
  }

  get iotMarkerPosition(): google.maps.LatLngLiteral {
    const lat = this.vehicleData?.lat ?? -12.0464;
    const lng = this.vehicleData?.lng ?? -77.0428;
    return { lat: Number(lat), lng: Number(lng) };
  }

  redirectToWhatsApp() {
    const whatsappUrl = 'https://wa.me/51934893731?text=Hello%20I%20am%20interested%20in%20your%20vehicle';
    window.open(whatsappUrl, '_blank');
  }
}
