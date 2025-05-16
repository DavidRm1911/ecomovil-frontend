import {Component, inject, OnInit} from '@angular/core';
import {Vehicle} from "../../model/vehicle.entity";
import {VehicleService} from "../../services/vehicle.service";
import {NgForOf} from "@angular/common";
import {MatCardImage} from "@angular/material/card";
import {RouterLink} from "@angular/router";
import {HeaderComponent} from "../../../public/components/header/header.component";
import {TranslateModule} from "@ngx-translate/core";
import {LogoApiService} from '../../../shared/services/logo-api.service';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [
    NgForOf,
    MatCardImage,
    RouterLink,
    TranslateModule,
    HeaderComponent
  ],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent implements OnInit {
  protected vehicleData: Vehicle[] = [];
  private vehicleService: VehicleService = inject(VehicleService);
  private Logo = inject(LogoApiService);
  options = [
    {path: '/postVehicle', title: 'Post Vehicle'}]

  getLogoUrl(url: string) {
    return this.Logo.getUrlToLogo(url);
  }


  ngOnInit(): void {
    this.getAllVehicles();
  }

  private getAllVehicles() {
    this.vehicleService.getMyVehicles().subscribe((response: Vehicle[]) => {
      console.log('🚗 Mis vehículos:', response);
      this.vehicleData = response;
    });
  }
}
