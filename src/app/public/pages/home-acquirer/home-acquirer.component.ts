import {Component, inject, Input, OnInit} from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {MatCardImage} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {LogoApiService} from "../../../shared/services/logo-api.service";
import {RouterLink} from "@angular/router";
import {HeaderAcquirerComponent} from "../../components/header-acquirer/header-acquirer.component";
import {Vehicle} from '../../../vehicles/model/vehicle.entity';
import {VehicleService} from '../../../vehicles/services/vehicle.service';

@Component({
  selector: 'app-home-acquirer',
  standalone: true,
  imports: [
    HeaderComponent,
    MatCardImage,
    NgForOf,
    HeaderAcquirerComponent,
    RouterLink
  ],
  templateUrl: './home-acquirer.component.html',
  styleUrl: './home-acquirer.component.css'
})
export class HomeAcquirerComponent {
  protected vehicleData: Vehicle[] = [];
  private vehicleService: VehicleService = inject(VehicleService);
  private Logo = inject(LogoApiService);

  getLogoUrl(url: string) {
    return this.Logo.getUrlToLogo(url);
  }
  options = [
    {path: '/postVehicle', title: 'Post Vehicle'}]
  ngOnInit(): void {
    this.getAllVehicles();
  }

  private getAllVehicles() {
    this.vehicleService.getAll().subscribe((response: Vehicle[]) => {
      console.log(response);
      this.vehicleData = response;
    });
  }
}
