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



  ngOnInit() {
    this.loadMarkers();

  }

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = event.latLng!.toJSON();
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng!.toJSON();
  }

  markers: Array<{ position: google.maps.LatLngLiteral, vehicleId: number }> = [];

  addMarkerAtPosition(lat: number, lng: number, vehicleId: number) {
    this.markers.push({ position: { lat, lng }, vehicleId });
  }

  private loadMarkers() {
    this.vehicleService.getAll().subscribe((response: Vehicle[]) => {
      this.vehicleData = response;
      response.forEach(vehicle => {
        this.addMarkerAtPosition(vehicle.lat, vehicle.lng, vehicle.id);
      });
    });
  }

  markerClick(vehicleId: number) {
    this.router.navigate(['/vehicleDetailsAcquirer', vehicleId]);
  }
}
