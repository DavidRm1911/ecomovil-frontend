import { Component, OnInit, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { HeaderComponent } from '../../../public/components/header/header.component';
import { Vehicle } from '../../model/vehicle.entity';
import { VehicleService } from '../../services/vehicle.service';
import { UserService } from '../../../auth/services/user.service';
import { VehicleContactCardComponent } from '../../components/vehicle-contact-card/vehicle-contact-card.component';

interface MarketplaceItem {
  vehicle: Vehicle;
  ownerName: string;
  ownerPhone: string;
}

/**
 * US23 — Foro/marketplace de contacto. Renders every available vehicle as a
 * card with a direct "Contact via WhatsApp" action to coordinate a safe
 * pickup/return, resolving each owner's name/phone from the Users service.
 * Route: /marketplace
 */
@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, TranslateModule, HeaderComponent, VehicleContactCardComponent],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css'
})
export class MarketplaceComponent implements OnInit {
  private vehicleService = inject(VehicleService);
  private userService = inject(UserService);

  protected items: MarketplaceItem[] = [];
  protected loading = true;
  protected searchTerm = '';

  ngOnInit(): void {
    this.vehicleService.getAll().subscribe({
      next: (vehicles) => this.loadOwners(vehicles.filter(v => v.isAvailable)),
      error: (err) => { console.error(err); this.loading = false; }
    });
  }

  private loadOwners(vehicles: Vehicle[]) {
    if (vehicles.length === 0) { this.loading = false; return; }

    const requests = vehicles.map((vehicle) =>
      this.userService.getUserById(vehicle.studentId).pipe(
        map((owner: any) => this.toItem(vehicle, owner)),
        catchError(() => of(this.toItem(vehicle, null)))
      )
    );

    forkJoin(requests).subscribe((items) => {
      this.items = items;
      this.loading = false;
    });
  }

  private toItem(vehicle: Vehicle, owner: any): MarketplaceItem {
    const rawPhone = owner?.phoneNumber || owner?.phone || '';
    const cleaned = rawPhone.replace(/\D/g, '');
    const ownerPhone = cleaned && cleaned !== '000000000'
      ? (cleaned.startsWith('51') ? cleaned : '51' + cleaned)
      : '';
    const ownerName = owner ? `${owner.firstName ?? ''} ${owner.lastName ?? ''}`.trim() : '';
    return { vehicle, ownerName, ownerPhone };
  }

  get filteredItems(): MarketplaceItem[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.items;
    return this.items.filter(item =>
      item.vehicle.name.toLowerCase().includes(term) ||
      item.vehicle.type.toLowerCase().includes(term) ||
      item.ownerName.toLowerCase().includes(term)
    );
  }
}
