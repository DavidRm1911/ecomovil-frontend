import {Component, inject, OnInit} from '@angular/core';
import {GoogleMap, MapMarker} from "@angular/google-maps";
import {Router} from "@angular/router";
import {NgForOf} from "@angular/common";
import {HeaderAcquirerComponent} from "../../components/header-acquirer/header-acquirer.component";
import {TranslateModule} from "@ngx-translate/core";
import {Vehicle} from '../../../vehicles/model/vehicle.entity';
import {VehicleService} from '../../../vehicles/services/vehicle.service';

@Component({
  selector: 'app-interactive-map',
  standalone: true,
    imports: [GoogleMap, MapMarker, NgForOf, HeaderAcquirerComponent, TranslateModule],
  templateUrl: './interactive-map.component.html',
  styleUrl: './interactive-map.component.css'
})
export class InteractiveMapComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: -12.098089934437155, lng: -77.05815168994613 };
  zoom = 12;
  display: google.maps.LatLngLiteral | undefined;
  protected vehicleData: Vehicle[] = [];

  private vehicleService: VehicleService = inject(VehicleService);
  private router: Router = inject(Router);


  markers: Array<{ position: google.maps.LatLngLiteral }> = [];

  ngOnInit() {
    this.addMarkerAtPosition(-12.098089934437155, -77.05815168994613);
    this.loadMarkers();

  }

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = event.latLng!.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng!.toJSON();
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const newMarker = {
        position: event.latLng.toJSON()
      };
      this.markers.push(newMarker);
    }
  }

  addMarkerAtPosition(lat: number, lng: number) {
    const newMarker = {
      position: { lat, lng }
    };
    this.markers.push(newMarker);
  }

  markerClick() {
    this.router.navigate(['/myVehicles']); // Redirige a /myVehicles sin parámetros
  }

  private loadMarkers() {
    this.vehicleService.getAll().subscribe((response: Vehicle[]) => {
      response.forEach((vehicle: Vehicle) => {
        this.addMarkerAtPosition(vehicle.lat, vehicle.lng);
      });
    });
  }
}
