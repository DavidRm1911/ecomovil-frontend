import { Injectable } from '@angular/core';
import {Vehicle} from "../model/vehicle.entity";
import {BaseService} from '../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends BaseService<Vehicle> {

  constructor() {
    super();
    this.resourceEndPoint = '/vehicles';
  }

  getMyVehicles() {
    return this.http.get<Vehicle[]>(`https://app-250421124000.azurewebsites.net/api/v1/vehicles/my-vehicles`);
  }

  getByType(type: string) {
    return this.http.get<Vehicle[]>(`https://app-250421124000.azurewebsites.net/api/v1/vehicles/type/${type}`);
  }
}
