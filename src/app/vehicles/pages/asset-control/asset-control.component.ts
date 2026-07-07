import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { NgIf, DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

import { HeaderComponent } from '../../../public/components/header/header.component';
import { Vehicle } from '../../model/vehicle.entity';
import { IncidentAlert } from '../../model/incident-alert.entity';
import { TelemetryService, GeofenceConfig } from '../../services/telemetry.service';
import { LockToggleComponent } from '../../components/lock-toggle/lock-toggle.component';
import { GeofenceEditorComponent } from '../../components/geofence-editor/geofence-editor.component';
import { IncidentFeedComponent } from '../../../shared/components/incident-feed/incident-feed.component';

/**
 * Proveedor-facing asset protection panel: remote lock/unlock + geofencing
 * configuration + live alert banner when the vehicle leaves the geofence.
 * Route: /assetControl/:id
 */
@Component({
  selector: 'app-asset-control',
  standalone: true,
  imports: [
    NgIf, DatePipe, TranslateModule,
    HeaderComponent, LockToggleComponent, GeofenceEditorComponent, IncidentFeedComponent
  ],
  templateUrl: './asset-control.component.html',
  styleUrl: './asset-control.component.css'
})
export class AssetControlComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private telemetryService = inject(TelemetryService);

  protected vehicle: Vehicle | null = null;
  protected alerts: IncidentAlert[] = [];

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

  onVehicleLockChanged(updated: Vehicle) {
    this.vehicle = updated;
  }

  onGeofenceSaved(config: GeofenceConfig) {
    if (!this.vehicle) return;
    this.vehicle = new Vehicle({
      ...this.vehicle,
      geofenceCenterLat: config.centerLat,
      geofenceCenterLng: config.centerLng,
      geofenceRadiusM: config.radiusM
    });
  }
}
