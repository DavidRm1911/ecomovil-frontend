import {Component, Input} from '@angular/core';
import {Vehicle} from "../../model/vehicle.entity";

@Component({
  selector: 'app-vehicle-item',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-item.component.html',
  styleUrl: './vehicle-item.component.css'
})
export class VehicleItemComponent {
  @Input () vehicle!: Vehicle;

  constructor(){
    this.vehicle = new Vehicle({});
  }
}
