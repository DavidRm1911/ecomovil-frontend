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
    return this.http.get<Vehicle[]>(`${this.basePath}/vehicles/my-vehicles`);
  }

  getByType(type: string) {
    return this.http.get<Vehicle[]>(`${this.basePath}/vehicles/type/${type}`);
  }

  getVehiclePublic(id: number) {
    return this.http.get<Vehicle>(`${this.basePath}/vehicles/public/${id}`);
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ url: string }>(`${this.basePath}/vehicles/upload-image`, formData);
  }

  chat(message: string, lat?: number, lng?: number, userName?: string, history?: { role: string; text: string }[]) {
    return this.http.post<{
      reply: string;
      suggestions: { id: number; name: string; type: string; priceSell: number; priceRent: number; imageUrl: string; distanceKm: number | null }[];
    }>(`${this.basePath}/vehicles/chat`, { message, lat, lng, userName, history });
  }

  lockVehicle(vehicleId: number) {
    return this.http.post<Vehicle>(`${this.basePath}/vehicles/${vehicleId}/lock`, {});
  }

  unlockVehicle(vehicleId: number) {
    return this.http.post<Vehicle>(`${this.basePath}/vehicles/${vehicleId}/unlock`, {});
  }

  getTelemetryHistory(vehicleId: number, limit = 200) {
    return this.http.get<TelemetryPoint[]>(
      `${this.basePath}/vehicles/${vehicleId}/telemetry/history?limit=${limit}`
    );
  }
}

export interface TelemetryPoint {
  ts: number;
  lat: number;
  lng: number;
  speed_kmh: number;
  is_locked: boolean;
  fall_detected: boolean;
  panic_active: boolean;
}
