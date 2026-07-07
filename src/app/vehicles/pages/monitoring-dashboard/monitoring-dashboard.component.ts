import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from '../../../public/components/header/header.component';
import { Vehicle } from '../../model/vehicle.entity';
import { IncidentAlert } from '../../model/incident-alert.entity';
import { TelemetryService } from '../../services/telemetry.service';
import { SpeedometerComponent } from '../../components/speedometer/speedometer.component';
import { PanicButtonComponent } from '../../components/panic-button/panic-button.component';
import { IncidentFeedComponent } from '../../../shared/components/incident-feed/incident-feed.component';

/**
 * Adquirente-facing real-time monitoring panel (US: live tracking + panic).
 * Route: /monitoring/:id
 */
@Component({
  selector: 'app-monitoring-dashboard',
  standalone: true,
  imports: [
    NgIf, GoogleMap, MapMarker, TranslateModule,
    HeaderComponent, SpeedometerComponent, PanicButtonComponent, IncidentFeedComponent
  ],
  templateUrl: './monitoring-dashboard.component.html',
  styleUrl: './monitoring-dashboard.component.css'
})
export class MonitoringDashboardComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private telemetryService = inject(TelemetryService);

  protected vehicle: Vehicle | null = null;
  protected alerts: IncidentAlert[] = [];
  protected zoom = 16;

  private telemetrySub?: Subscription;
  private alertsSub?: Subscription;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const vehicleId = idParam ? +idParam : null;
    if (!vehicleId) return;

    this.telemetryService.clearAlerts();

    this.telemetrySub = this.telemetryService.streamVehicle(vehicleId).subscribe((vehicle) => {
      this.vehicle = vehicle;
    });

    this.alertsSub = this.telemetryService.alerts$.subscribe((alerts) => {
      this.alerts = alerts;
    });
  }

  ngOnDestroy(): void {
    this.telemetrySub?.unsubscribe();
    this.alertsSub?.unsubscribe();
  }

  get mapCenter(): google.maps.LatLngLiteral {
    return this.vehicle && this.vehicle.lat && this.vehicle.lng
      ? { lat: this.vehicle.lat, lng: this.vehicle.lng }
      : { lat: -12.0464, lng: -77.0428 };
  }
}
