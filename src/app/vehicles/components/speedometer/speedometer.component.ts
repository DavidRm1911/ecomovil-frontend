import { Component, Input } from '@angular/core';
import { NgIf, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-speedometer',
  standalone: true,
  imports: [NgIf, DecimalPipe],
  templateUrl: './speedometer.component.html',
  styleUrl: './speedometer.component.css'
})
export class SpeedometerComponent {
  /** Instant speed in km/h, computed backend-side from the Hall effect sensor pulses. */
  @Input() speedKmh: number | null = 0;
  @Input() maxSpeed = 60;
  @Input() overspeedLimit = 35;

  get clamped(): number {
    const v = this.speedKmh ?? 0;
    return Math.max(0, Math.min(v, this.maxSpeed));
  }

  /** Needle rotation: -90deg (0 km/h) to +90deg (maxSpeed). */
  get needleRotation(): number {
    return -90 + (this.clamped / this.maxSpeed) * 180;
  }

  get isOverspeed(): boolean {
    return (this.speedKmh ?? 0) > this.overspeedLimit;
  }
}
