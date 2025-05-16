import {Component, inject} from '@angular/core';
import {PaymentComponent} from "../../components/payment/payment.component";
import {PaymentService} from "../../../shared/services/payment.service";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-payment-page',
  standalone: true,
  imports: [
    PaymentComponent,
    TranslateModule,
  ],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {

  protected paymentService: PaymentService = inject(PaymentService);
  options = [
    {path: '/postVehicle', title: 'Post Vehicle'}]

}
