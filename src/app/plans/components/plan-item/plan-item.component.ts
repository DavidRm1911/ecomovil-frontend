import {Component, inject, Input } from '@angular/core';
import {Plan} from "../../model/plan";
import {NgIf, NgFor} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {PaymentService} from "../../../shared/services/payment.service";

@Component({
  selector: 'app-plan-item',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    RouterLink,
  ],
  templateUrl: './plan-item.component.html',
  styleUrl: './plan-item.component.css'
})
export class PlanItemComponent {
  @Input() plan!: Plan;
  private paymentService = inject(PaymentService);
  private router: Router = inject(Router);

  bronzeFeatures = [
    '5 publicaciones al mes',
    'Acceso al marketplace',
    'Perfil de vendedor básico',
    'Soporte por correo electrónico',
    'Historial de transacciones',
  ];

  silverFeatures = [
    '20 publicaciones al mes',
    'Acceso al marketplace',
    'Publicaciones destacadas',
    'Soporte prioritario 24/7',
    'Estadísticas de rendimiento',
    'Perfil verificado de vendedor',
  ];

  goldFeatures = [
    'Publicaciones ilimitadas',
    'Acceso al marketplace',
    'Publicaciones destacadas',
    'Soporte dedicado 24/7',
    'Estadísticas avanzadas',
    'Gestión IoT de vehículos',
    'Posición premium en búsquedas',
    'Insignia de vendedor élite',
  ];

  constructor() {
    this.plan = new Plan({});
  }

  onClick(){
    this.paymentService.modifyCost(this.plan.price);
     this.router.navigate(['/payment']);
     console.log("botno presionado")
  }

  protected readonly Number = Number;
}
