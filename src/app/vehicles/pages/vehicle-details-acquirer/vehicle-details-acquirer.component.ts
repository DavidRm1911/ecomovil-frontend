import {Component, inject, OnInit} from '@angular/core';
import {MatCardImage} from "@angular/material/card";
import {RatingModule} from "primeng/rating";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Vehicle} from "../../model/vehicle.entity";
import {VehicleService} from "../../services/vehicle.service";
import {HeaderComponent} from "../../../public/components/header/header.component";
import {TranslateModule} from "@ngx-translate/core";
import {ActivatedRoute} from "@angular/router";
import {LogoApiService} from '../../../shared/services/logo-api.service';

@Component({
  selector: 'app-vehicle-details-acquirer',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatCardImage,
    RatingModule,
    HeaderComponent,
    TranslateModule
  ],
  templateUrl: './vehicle-details-acquirer.component.html',
  styleUrl: './vehicle-details-acquirer.component.css'
})
export class VehicleDetailsAcquirerComponent implements OnInit{
  protected vehicleData: Vehicle | null = null;
  private vehicleService: VehicleService = inject(VehicleService);
  private route = inject(ActivatedRoute);
  private Logo = inject(LogoApiService);
  value?: number;

  randomRating() {
    this.value = Math.floor(Math.random() * 6);
  }

  getLogoUrl(url: string | undefined) {
    return this.Logo.getUrlToLogo(url);
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;

    if (id) {
      this.getVehiclebyId(id);
    } else {
      console.error('No se proporcionó un ID de vehículo en la ruta.');
    }

    this.randomRating();
  }

  private getVehiclebyId(id: number) {
    this.vehicleService.getbyId(id).subscribe((response: Vehicle) => {
      console.log('🚗 Vehículo recibido:', response);
      this.vehicleData = response;
    });
  }
  redirectToWhatsApp() {
    const whatsappUrl = 'https://wa.me/51934893731?text=Hello%20I%20am%20interested%20in%20your%20vehicle';
    window.open(whatsappUrl, '_blank');
  }
}
