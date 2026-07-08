import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Reservation {
  id: number;
  status: string;
  vehicleId: number;
  userId: number;
  startDate: string;
  endDate: string;
  totalPrice: number;
  reservationType: string;
  notes?: string;
}

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private http = inject(HttpClient);
  private base = `${environment.serverBasePath}/reservations`;

  create(vehicleId: number, startDate: string, endDate: string, pricePerDay: number): Observable<Reservation> {
    const days = Math.max(1, Math.round(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000
    ));
    return this.http.post<Reservation>(this.base, {
      status: 'pending',
      vehicleId,
      startDate,
      endDate,
      totalPrice: days * pricePerDay,
      reservationType: 'rent',
      notes: ''
    });
  }

  getByVehicle(vehicleId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.base}/vehicle/${vehicleId}`);
  }

  getMyReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.base}/my-reservations`);
  }
}
