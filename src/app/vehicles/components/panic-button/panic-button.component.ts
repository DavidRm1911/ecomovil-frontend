import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { TelemetryService } from '../../services/telemetry.service';

@Component({
  selector: 'app-panic-button',
  standalone: true,
  imports: [NgIf],
  templateUrl: './panic-button.component.html',
  styleUrl: './panic-button.component.css'
})
export class PanicButtonComponent {
  /** Reflects the state of the vehicle's physical red panic button. */
  @Input() panicActive = false;
  @Input() vehicleId!: number;
  @Input() vehicleName = '';
  @Output() triggered = new EventEmitter<void>();

  private telemetryService = inject(TelemetryService);

  sending = false;
  justSent = false;

  activatePanic() {
    if (this.sending) return;
    const confirmed = window.confirm(
      '¿Confirmas que deseas activar la alerta de pánico? Se notificará de inmediato al proveedor del vehículo y a soporte.'
    );
    if (!confirmed) return;

    this.sending = true;
    this.telemetryService.triggerPanic(this.vehicleId, this.vehicleName).subscribe({
      next: () => {
        this.sending = false;
        this.justSent = true;
        this.triggered.emit();
        setTimeout(() => (this.justSent = false), 4000);
      },
      error: () => { this.sending = false; }
    });
  }
}
