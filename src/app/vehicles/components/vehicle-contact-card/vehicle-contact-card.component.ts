import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Vehicle } from '../../model/vehicle.entity';

@Component({
  selector: 'app-vehicle-contact-card',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './vehicle-contact-card.component.html',
  styleUrl: './vehicle-contact-card.component.css'
})
export class VehicleContactCardComponent {
  @Input({ required: true }) vehicle!: Vehicle;
  /** Owner display name, resolved from the users microservice by the parent page. */
  @Input() ownerName = '';
  /** Owner phone in international format without '+' (e.g. 51987654321). */
  @Input() ownerPhone = '';

  get whatsappUrl(): string {
    const phone = this.ownerPhone || '51999999999';
    const text = encodeURIComponent(
      `Hola${this.ownerName ? ' ' + this.ownerName : ''}, vi tu vehículo "${this.vehicle?.name}" en EcoMóvil. ` +
      `¿Podemos coordinar la entrega/devolución segura del vehículo?`
    );
    return `https://wa.me/${phone}?text=${text}`;
  }

  openWhatsApp(event: Event) {
    event.stopPropagation();
    window.open(this.whatsappUrl, '_blank');
  }
}
