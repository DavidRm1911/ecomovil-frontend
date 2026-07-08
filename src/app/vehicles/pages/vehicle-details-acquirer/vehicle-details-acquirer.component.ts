import {Component, inject, OnInit, OnDestroy} from '@angular/core';
import {NgIf, NgFor, DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Vehicle} from "../../model/vehicle.entity";
import {VehicleService} from "../../services/vehicle.service";
import {HeaderComponent} from "../../../public/components/header/header.component";
import {TranslateModule} from "@ngx-translate/core";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserService} from '../../../auth/services/user.service';
import {ReservationService, Reservation} from '../../../shared/services/reservation.service';
import {TelemetryService} from '../../services/telemetry.service';
import {IncidentAlert} from '../../model/incident-alert.entity';
import {GoogleMap, MapMarker} from '@angular/google-maps';
import {SpeedometerComponent} from '../../components/speedometer/speedometer.component';
import {PanicButtonComponent} from '../../components/panic-button/panic-button.component';
import {IncidentFeedComponent} from '../../../shared/components/incident-feed/incident-feed.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-vehicle-details-acquirer',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, FormsModule, DatePipe, HeaderComponent, TranslateModule,
            GoogleMap, MapMarker, SpeedometerComponent, PanicButtonComponent, IncidentFeedComponent],
  templateUrl: './vehicle-details-acquirer.component.html',
  styleUrl: './vehicle-details-acquirer.component.css'
})
export class VehicleDetailsAcquirerComponent implements OnInit, OnDestroy {
  protected vehicleData: Vehicle | null = null;
  protected ownerPhone: string = '';
  protected telemetryVehicle: Vehicle | null = null;
  protected alerts: IncidentAlert[] = [];

  showRentModal = false;
  rentStartDate = '';
  rentEndDate = '';
  rentLoading = false;
  rentError: string | null = null;
  rentSuccess: Reservation | null = null;
  bookedRanges: {startDate: string, endDate: string}[] = [];
  availabilityLoading = false;

  private vehicleService = inject(VehicleService);
  private userService = inject(UserService);
  private reservationService = inject(ReservationService);
  private telemetryService = inject(TelemetryService);
  private route = inject(ActivatedRoute);
  private telemetrySub?: Subscription;
  private alertsSub?: Subscription;

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

  get hasDateConflict(): boolean {
    if (!this.rentStartDate || !this.rentEndDate) return false;
    return this.bookedRanges.some(r =>
      this.rentStartDate <= r.endDate && this.rentEndDate >= r.startDate
    );
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
    if (!id) return;
    this.loadVehicle(id);
    this.telemetryService.clearAlerts();
    this.telemetrySub = this.telemetryService.streamVehicle(id).subscribe(v => this.telemetryVehicle = v);
    this.alertsSub = this.telemetryService.alerts$.subscribe(a => this.alerts = a);
  }

  ngOnDestroy(): void {
    this.telemetrySub?.unsubscribe();
    this.alertsSub?.unsubscribe();
  }

  get mapCenter(): google.maps.LatLngLiteral {
    return this.telemetryVehicle?.lat && this.telemetryVehicle?.lng
      ? { lat: this.telemetryVehicle.lat, lng: this.telemetryVehicle.lng }
      : { lat: -12.0464, lng: -77.0428 };
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

    if (this.vehicleData?.id) {
      this.availabilityLoading = true;
      this.reservationService.getAvailability(this.vehicleData.id).subscribe({
        next: (ranges) => { this.bookedRanges = ranges; this.availabilityLoading = false; },
        error: () => { this.availabilityLoading = false; }
      });
    }
  }

  closeRentModal() {
    this.showRentModal = false;
  }

  confirmRent() {
    if (!this.vehicleData || !this.rentStartDate || !this.rentEndDate) return;
    if (this.hasDateConflict) {
      this.rentError = 'Estas fechas ya están reservadas. Elige otras fechas disponibles.';
      return;
    }
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
