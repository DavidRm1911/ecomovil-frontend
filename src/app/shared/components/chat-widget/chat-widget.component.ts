import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../../vehicles/services/vehicle.service';

interface ChatTurn {
  from: 'user' | 'bot';
  text: string;
  suggestions?: { id: number; name: string; priceSell: number; priceRent: number; distanceKm: number | null }[];
}

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, FormsModule],
  templateUrl: './chat-widget.component.html'
})
export class ChatWidgetComponent {
  private vehicleService = inject(VehicleService);

  open = false;
  sending = false;
  input = '';
  turns: ChatTurn[] = [];
  private lat?: number;
  private lng?: number;

  toggle() {
    this.open = !this.open;
    if (this.open && !this.lat && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => { this.lat = pos.coords.latitude; this.lng = pos.coords.longitude; },
        () => {} // ponytail: location is optional, bot still works without it
      );
    }
  }

  send() {
    const message = this.input.trim();
    if (!message || this.sending) return;
    this.turns.push({ from: 'user', text: message });
    this.input = '';
    this.sending = true;

    this.vehicleService.chat(message, this.lat, this.lng).subscribe({
      next: (res) => {
        this.turns.push({ from: 'bot', text: res.reply, suggestions: res.suggestions });
        this.sending = false;
      },
      error: () => {
        this.turns.push({ from: 'bot', text: 'No pude conectar con el asistente, intenta de nuevo.' });
        this.sending = false;
      }
    });
  }
}
