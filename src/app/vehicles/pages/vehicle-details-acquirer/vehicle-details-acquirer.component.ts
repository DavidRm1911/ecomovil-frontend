import {Component, inject, OnInit} from '@angular/core';
import {NgIf, DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Vehicle} from "../../model/vehicle.entity";
import {VehicleService} from "../../services/vehicle.service";
import {HeaderComponent} from "../../../public/components/header/header.component";
import {TranslateModule} from "@ngx-translate/core";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserService} from '../../../auth/services/user.service';
import {ReservationService, Reservation} from '../../../shared/services/reservation.service';

@Component({
  selector: 'app-vehicle-details-acquirer',
  standalone: true,
  imports: [NgIf, RouterLink, FormsModule, DatePipe, HeaderComponent, TranslateModule],
  templateUrl: './vehicle-details-acquirer.component.html',
  styleUrl: './vehicle-details-acquirer.component.css'
})
export class VehicleDetailsAcquirerComponent implements OnInit {
  protected vehicleData: Vehicle | null = null;
  protected ownerPhone: string = '';

  showRentModal = false;
  rentStartDate = '';
  rentEndDate = '';
  rentLoading = false;
  rentError: string | null = null;
  rentSuccess: Reservation | null = null;

  private vehicleService = inject(VehicleService);
  private userService = inject(UserService);
  private reservationService = inject(ReservationService);
  private route = inject(ActivatedRoute);

  get today(): string {
    return new Date().toISOString().split('T')[0];
  }

  get rentDays(): number {
    if (!this.rentStartDate || !this.rentEndDate) return 0;
    return Math.max(1, Math.round(
      (new Date(this.rentEndDate).getTime() - new Date(this.rentStartDate).getTime()) / 86400000
    ));
  }

  get rentTotal(): number {
    return this.rentDays * (this.vehicleData?.priceRent ?? 0);
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
    if (id) this.loadVehicle(id);
  }

  private loadVehicle(id: number) {
    this.vehicleService.getVehiclePublic(id).subscribe({
      next: (vehicle: Vehicle) => {
        this.vehicleData = vehicle;
        if (vehicle.studentId) this.loadOwnerPhone(vehicle.studentId);
      },
      error: (err) => console.error('Error loading vehicle:', err)
    });
  }

  private loadOwnerPhone(studentId: number) {
    this.userService.getbyId(studentId).subscribe({
      next: (owner: any) => {
        const phone = owner.phoneNumber || owner.phone || '';
        const cleaned = phone.replace(/\D/g, '');
        if (cleaned && cleaned !== '000000000') {
          this.ownerPhone = cleaned.startsWith('51') ? cleaned : '51' + cleaned;
        }
      },
      error: () => {}
    });
  }

  openRentModal() {
    this.showRentModal = true;
    this.rentError = null;
    this.rentSuccess = null;
    const start = new Date();
    const end = new Date();
    end.setDate(end.getDate() + 1);
    this.rentStartDate = start.toISOString().split('T')[0];
    this.rentEndDate = end.toISOString().split('T')[0];
  }

  closeRentModal() {
    this.showRentModal = false;
  }

  confirmRent() {
    if (!this.vehicleData || !this.rentStartDate || !this.rentEndDate) return;
    this.rentLoading = true;
    this.rentError = null;
    this.reservationService.create(
      this.vehicleData.id,
      this.rentStartDate,
      this.rentEndDate,
      this.vehicleData.priceRent
    ).subscribe({
      next: (res) => {
        this.rentSuccess = res;
        this.rentLoading = false;
      },
      error: (err) => {
        this.rentError = 'No se pudo crear la reserva. Intenta de nuevo.';
        this.rentLoading = false;
        console.error(err);
      }
    });
  }

  redirectToWhatsApp() {
    const phone = this.ownerPhone || '51999999999';
    const text = encodeURIComponent(`Hola, estoy interesado en tu vehículo "${this.vehicleData?.name}". ¿Está disponible?`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  }
}
