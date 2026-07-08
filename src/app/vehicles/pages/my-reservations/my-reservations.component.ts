import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../../public/components/header/header.component';
import { ReservationService, Reservation } from '../../../shared/services/reservation.service';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-my-reservations',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, RouterLink, HeaderComponent],
  templateUrl: './my-reservations.component.html',
})
export class MyReservationsComponent implements OnInit {
  protected reservations: Reservation[] = [];
  protected vehicleNames = new Map<number, string>();
  protected loading = true;
  protected cancellingId: number | null = null;

  private reservationService = inject(ReservationService);
  private vehicleService = inject(VehicleService);

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.loading = true;
    this.reservationService.getMyReservations().subscribe({
      next: (res) => {
        this.reservations = res;
        this.loading = false;
        const ids = [...new Set(res.map(r => r.vehicleId))];
        ids.forEach(id => {
          this.vehicleService.getVehiclePublic(id).subscribe({
            next: (v) => this.vehicleNames.set(id, v.name),
            error: () => this.vehicleNames.set(id, `Vehículo #${id}`)
          });
        });
      },
      error: () => { this.loading = false; }
    });
  }

  vehicleName(vehicleId: number): string {
    return this.vehicleNames.get(vehicleId) ?? `Vehículo #${vehicleId}`;
  }

  canCancel(r: Reservation): boolean {
    return r.status === 'pending' || r.status === 'confirmed';
  }

  cancelReservation(r: Reservation): void {
    if (!this.canCancel(r)) return;
    if (!confirm(`¿Cancelar la reserva #${r.id}? Esta acción no se puede deshacer.`)) return;
    this.cancellingId = r.id;
    this.reservationService.cancel(r.id).subscribe({
      next: (updated) => {
        const idx = this.reservations.findIndex(x => x.id === r.id);
        if (idx !== -1) this.reservations[idx] = updated;
        this.cancellingId = null;
      },
      error: () => { this.cancellingId = null; }
    });
  }
}
