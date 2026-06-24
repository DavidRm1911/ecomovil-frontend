import {Component, inject, OnInit, OnDestroy} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UpperCasePipe, DatePipe, NgIf, DecimalPipe} from "@angular/common";
import {Vehicle} from "../../model/vehicle.entity";
import { VehicleService } from '../../services/vehicle.service';
import {MatCardImage} from "@angular/material/card";
import {RatingModule} from "primeng/rating";
import {HeaderComponent} from "../../../public/components/header/header.component";
import {TranslateModule} from "@ngx-translate/core";
import {LogoApiService} from '../../../shared/services/logo-api.service';
import {GoogleMap, MapMarker} from "@angular/google-maps";

@Component({
  selector: 'app-vehicle-details',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardImage,
    RatingModule,
    UpperCasePipe,
    DatePipe,
    DecimalPipe,
    NgIf,
    TranslateModule,
    HeaderComponent,
    GoogleMap,
    MapMarker
  ],
  templateUrl: './vehicle-details.component.html',
  styleUrl: './vehicle-details.component.css'
})
export class VehicleDetailsComponent implements OnInit, OnDestroy {
  protected vehicleData: Vehicle | null = null;
  protected iotLoading = false;
  protected iotError: string | null = null;

  private vehicleService: VehicleService = inject(VehicleService);
  private Logo = inject(LogoApiService);
  private pollInterval: ReturnType<typeof setInterval> | null = null;
  value?: number;

  randomRating() {
    this.value = Math.floor(Math.random() * 6);
  }

  getLogoUrl(url: string | undefined) {
    return this.Logo.getUrlToLogo(url);
  }

  ngOnInit(): void {
    this.getVehiclebyId(1);
    this.randomRating();
    // Poll IoT status every 10 seconds to show fresh GPS + lock state
    this.pollInterval = setInterval(() => this.getVehiclebyId(this.vehicleData?.id ?? 1), 10000);
  }

  ngOnDestroy(): void {
    if (this.pollInterval) clearInterval(this.pollInterval);
  }

  private getVehiclebyId(id: number) {
    this.vehicleService.getbyId(id).subscribe((response: Vehicle) => {
      this.vehicleData = response;
    });
  }

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

  get hasIotGps(): boolean {
    return !!(this.vehicleData?.lat && this.vehicleData?.lng
              && this.vehicleData.lat !== 0 && this.vehicleData.lng !== 0);
  }

  get iotMapCenter(): google.maps.LatLngLiteral {
    return this.hasIotGps
      ? { lat: this.vehicleData!.lat, lng: this.vehicleData!.lng }
      : { lat: -12.0464, lng: -77.0428 }; // Lima por defecto
  }

  get iotMarkerPosition(): google.maps.LatLngLiteral {
    return { lat: this.vehicleData!.lat, lng: this.vehicleData!.lng };
  }

  redirectToWhatsApp() {
    const whatsappUrl = 'https://wa.me/51934893731?text=Hello%20I%20am%20interested%20in%20your%20vehicle';
    window.open(whatsappUrl, '_blank');
  }
}
