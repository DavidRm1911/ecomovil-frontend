import {Component, inject, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {Vehicle} from "../../model/vehicle.entity";
import {VehicleService} from "../../services/vehicle.service";
import {FormsModule} from "@angular/forms"
import {Router} from "@angular/router";
import {HeaderComponent} from "../../../public/components/header/header.component";
import {TranslateModule} from "@ngx-translate/core";
import {LogoApiService} from '../../../shared/services/logo-api.service';

@Component({
  selector: 'app-vehicle-post',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    TranslateModule,
    HeaderComponent
  ],
  templateUrl: './vehicle-post.component.html',
  styleUrl: './vehicle-post.component.css'
})
export class VehiclePostComponent implements OnInit {
  protected vehicleData: Vehicle[] = [];
  public newVehicle: Vehicle = new Vehicle({});

  selectedImageFile: File | null = null;
  imagePreview: string | null = null;
  imageUploadError = '';
  uploading = false;

  private vehicleService: VehicleService = inject(VehicleService);
  private Logo = inject(LogoApiService);
  private router = inject(Router);

  options = [
    {path: '/myVehicles', title: 'My Vehicles'}]

  constructor() {}

  ngOnInit(): void {
    this.getAllVehicles();
  }

  private getAllVehicles() {
    this.vehicleService.getAll().subscribe((response: Vehicle[]) => {
      this.vehicleData = response;
    });
  }

  private getCurrentLocation(): Promise<{ lat: number, lng: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve({ lat: position.coords.latitude, lng: position.coords.longitude }),
          (error) => { console.error('Error', error); reject(error); }
        );
      } else {
        reject('Geolocalización no soportada');
      }
    });
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    if (file.size > 5 * 1024 * 1024) {
      this.imageUploadError = 'La imagen no puede superar 5 MB';
      return;
    }
    this.imageUploadError = '';
    this.selectedImageFile = file;
    const reader = new FileReader();
    reader.onload = (e) => { this.imagePreview = e.target?.result as string; };
    reader.readAsDataURL(file);
  }

  public onClick(): void {
    if (!this.newVehicle.description || !this.newVehicle.type || !this.newVehicle.year ||
        !this.newVehicle.priceSell || !this.newVehicle.priceRent || !this.newVehicle.name) return;

    this.getCurrentLocation().then((coords) => {
      this.newVehicle.lat = coords.lat;
      this.newVehicle.lng = coords.lng;

      if (this.selectedImageFile) {
        this.uploading = true;
        this.vehicleService.uploadImage(this.selectedImageFile).subscribe({
          next: (res) => {
            this.newVehicle.imageUrl = res.url;
            this.createVehicle();
          },
          error: (err) => {
            console.error('Error uploading image:', err);
            this.uploading = false;
            this.imageUploadError = 'Error al subir la imagen. Intenta de nuevo.';
          }
        });
      } else {
        this.newVehicle.imageUrl = '';
        this.createVehicle();
      }
    }).catch(() => {
      this.uploading = false;
      this.imageUploadError = 'Permiso de ubicación denegado. Activa la geolocalización e intenta de nuevo.';
    });
  }

  private createVehicle(): void {
    this.vehicleService.create(this.newVehicle).subscribe({
      next: (response: any) => {
        this.vehicleData = [...this.vehicleData, response];
        this.newVehicle = new Vehicle({});
        this.selectedImageFile = null;
        this.imagePreview = null;
        this.uploading = false;
        this.router.navigate(['/myVehicles']).then();
      },
      error: (err) => {
        console.error('Error creando el vehículo:', err);
        this.uploading = false;
        this.imageUploadError = 'Error al publicar el vehículo. Intenta de nuevo.';
      }
    });
  }
}
