import {Component, inject, OnInit} from '@angular/core';
import {MatCardImage} from "@angular/material/card";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {HeaderAcquirerComponent} from '../../../../public/components/header-acquirer/header-acquirer.component';
import {HeaderComponent} from '../../../../public/components/header/header.component';
import {Vehicle} from '../../../../vehicles/model/vehicle.entity';
import {VehicleService} from '../../../../vehicles/services/vehicle.service';
import {LogoApiService} from '../../../../shared/services/logo-api.service';


@Component({
  selector: 'app-home-acquirer',
  standalone: true,
    imports: [
        HeaderComponent,
        MatCardImage,
        NgForOf,
        HeaderAcquirerComponent,
        TranslateModule,
        RouterLink
    ],
  templateUrl: './home-acquirer.component.html',
  styleUrl: './home-acquirer.component.css'
})
export class HomeAcquirerComponent implements OnInit{
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

  public redirectToVehicleDetails(vehicleId: number): void {
    console.log('Redirecting to vehicle ID:', vehicleId);
  }

  private getAllVehicles() {
    this.vehicleService.getAll().subscribe((response: any[]) => {
      console.log('Vehículos cargados:', response);
      this.vehicleData = response.map(v => new Vehicle(v)); // <-- Esto lo arregla
    });
  }

}
