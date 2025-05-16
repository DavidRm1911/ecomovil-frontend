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
  public newVehicle: Vehicle = new Vehicle({}); // Initialize the object here

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
      console.log(response);
      this.vehicleData = response;
    });
  }

  private getCurrentLocation(): Promise<{ lat: number, lng: number }> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          (error) => {
            console.error('Error', error);
            reject(error);
          }
        );
      } else {
        reject('Geolocalización no soportada');
      }
    });
  }

  public onClick(): void {
    if (this.newVehicle.description && this.newVehicle.type && this.newVehicle.year && this.newVehicle.priceSell && this.newVehicle.priceRent && this.newVehicle.name) {
      this.getCurrentLocation().then((coords) => {
        this.newVehicle.lat = coords.lat;
        this.newVehicle.lng = coords.lng;
        this.newVehicle.imageUrl = this.newVehicle.imageUrl || 'https://www.oxfordstore.pe/media/catalog/product/cache/aae873136fa0fde5dba4b938a53c66f6/b/d/bd2979_sierra_29_negro_2021_01.jpg';
        this.vehicleService.create(this.newVehicle).subscribe({
          next: (response: any) => {
            this.vehicleData = [...this.vehicleData, response];
            this.newVehicle = new Vehicle({}); // Reset the object after submission
            this.router.navigate(['/myVehicles']).then();
          },
          error: (err) => {
            console.error('Error creando el vehículo:', err);
          }
        });
      }).catch((error) => {
        console.error('Error al obtener la ubicación: ', error);
      });
    }
  }
}
