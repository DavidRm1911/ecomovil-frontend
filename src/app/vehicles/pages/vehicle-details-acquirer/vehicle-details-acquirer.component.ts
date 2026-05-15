import {Component, inject, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {Vehicle} from "../../model/vehicle.entity";
import {VehicleService} from "../../services/vehicle.service";
import {HeaderComponent} from "../../../public/components/header/header.component";
import {TranslateModule} from "@ngx-translate/core";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {UserService} from '../../../auth/services/user.service';

@Component({
  selector: 'app-vehicle-details-acquirer',
  standalone: true,
  imports: [NgIf, RouterLink, HeaderComponent, TranslateModule],
  templateUrl: './vehicle-details-acquirer.component.html',
  styleUrl: './vehicle-details-acquirer.component.css'
})
export class VehicleDetailsAcquirerComponent implements OnInit {
  protected vehicleData: Vehicle | null = null;
  protected ownerPhone: string = '';

  private vehicleService = inject(VehicleService);
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
    if (id) this.loadVehicle(id);
  }

  private loadVehicle(id: number) {
    this.vehicleService.getVehiclePublic(id).subscribe({
      next: (vehicle: Vehicle) => {
        this.vehicleData = vehicle;
        if (vehicle.studentId) {
          this.loadOwnerPhone(vehicle.studentId);
        }
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

  redirectToWhatsApp() {
    const phone = this.ownerPhone || '51999999999';
    const text = encodeURIComponent(`Hola, estoy interesado en tu vehículo "${this.vehicleData?.name}". ¿Está disponible?`);
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  }
}
