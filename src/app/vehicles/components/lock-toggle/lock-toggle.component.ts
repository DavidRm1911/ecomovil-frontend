import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { Vehicle } from '../../model/vehicle.entity';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-lock-toggle',
  standalone: true,
  imports: [NgIf],
  templateUrl: './lock-toggle.component.html',
  styleUrl: './lock-toggle.component.css'
})
export class LockToggleComponent {
  /** Sends the LOCK/UNLOCK MQTT command down to the ESP32, which drives the 5V relay. */
  @Input({ required: true }) vehicle!: Vehicle;
  @Output() changed = new EventEmitter<Vehicle>();

  private vehicleService = inject(VehicleService);

  loading = false;
  error: string | null = null;

  toggle() {
    if (!this.vehicle || this.loading) return;
    this.loading = true;
    this.error = null;

    const action$ = this.vehicle.isLocked
      ? this.vehicleService.unlockVehicle(this.vehicle.id)
      : this.vehicleService.lockVehicle(this.vehicle.id);

    action$.subscribe({
      next: (updated) => {
        this.vehicle = updated;
        this.loading = false;
        this.changed.emit(updated);
      },
      error: (err) => {
        this.error = this.vehicle.isLocked ? 'No se pudo desbloquear el vehículo.' : 'No se pudo bloquear el vehículo.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
