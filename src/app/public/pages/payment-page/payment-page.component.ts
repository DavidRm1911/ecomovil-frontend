import {Component, inject} from '@angular/core';
import {PaymentService} from "../../../shared/services/payment.service";
import {RouterLink} from "@angular/router";
import {PaymentComponent} from '../../../plans/components/payment/payment.component';
import {PlanListComponent} from '../../../plans/components/plan-list/plan-list.component';

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [
    PaymentComponent,
    PlanListComponent,
    RouterLink
  ],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {

  protected paymentService: PaymentService = inject(PaymentService);
  options = [
    {path: '/postVehicle', title: 'Post Vehicle'}]

}
