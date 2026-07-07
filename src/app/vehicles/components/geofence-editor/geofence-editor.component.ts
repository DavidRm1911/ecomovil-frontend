import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GoogleMap, MapCircle, MapMarker } from '@angular/google-maps';
import { Vehicle } from '../../model/vehicle.entity';
import { TelemetryService, GeofenceConfig } from '../../services/telemetry.service';

@Component({
  selector: 'app-geofence-editor',
  standalone: true,
  imports: [NgIf, FormsModule, GoogleMap, MapCircle, MapMarker],
  templateUrl: './geofence-editor.component.html',
  styleUrl: './geofence-editor.component.css'
})
export class GeofenceEditorComponent implements OnChanges {
  @Input({ required: true }) vehicle!: Vehicle;
  @Output() saved = new EventEmitter<GeofenceConfig>();

  private telemetryService = inject(TelemetryService);

  zoom = 15;
  center: google.maps.LatLngLiteral = { lat: -12.0464, lng: -77.0428 };
  circleCenter: google.maps.LatLngLiteral = this.center;
  radiusM = 300;

  circleOptions: google.maps.CircleOptions = {
    strokeColor: '#1ACD81',
    strokeOpacity: 0.9,
    strokeWeight: 2,
    fillColor: '#1ACD81',
    fillOpacity: 0.15,
    draggable: false,
    editable: false
  };

  saving = false;
  saved_ = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['vehicle'] && this.vehicle) {
      const lat = this.vehicle.geofenceCenterLat ?? this.vehicle.lat;
      const lng = this.vehicle.geofenceCenterLng ?? this.vehicle.lng;
      if (lat && lng) {
        this.center = { lat, lng };
        this.circleCenter = { lat, lng };
      }
      this.radiusM = this.vehicle.geofenceRadiusM ?? 300;
    }
  }

  /** Clicking the map re-centers the geofence — the "drawing" interaction. */
  onMapClick(event: google.maps.MapMouseEvent) {
    if (!event.latLng) return;
    this.circleCenter = event.latLng.toJSON();
  }

  save() {
    if (!this.vehicle) return;
    this.saving = true;
    const config: GeofenceConfig = {
      centerLat: this.circleCenter.lat,
      centerLng: this.circleCenter.lng,
      radiusM: this.radiusM
    };
    this.telemetryService.setGeofence(this.vehicle.id, config).subscribe({
      next: () => {
        this.saving = false;
        this.saved_ = true;
        this.saved.emit(config);
        setTimeout(() => (this.saved_ = false), 3000);
      },
      error: () => { this.saving = false; }
    });
  }
}
