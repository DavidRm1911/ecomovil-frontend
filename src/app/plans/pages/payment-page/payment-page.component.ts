import {Component, inject} from '@angular/core';
import {PaymentComponent} from "../../components/payment/payment.component";
import {PlanListComponent} from "../../components/plan-list/plan-list.component";
import {PaymentService} from "../../../shared/services/payment.service";
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [
    PaymentComponent,
    PlanListComponent,
    TranslateModule,
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
