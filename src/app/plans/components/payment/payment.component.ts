import {Component, ElementRef, inject, Input, OnInit, ViewChild} from '@angular/core';
import {PaymentService} from "../../../shared/services/payment.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  paymentPrice!: number;
  private paymentService: PaymentService = inject(PaymentService);
  private router: Router = inject(Router);
  @ViewChild('paymentRef', {static: true}) paymentRef!: ElementRef;

  ngOnInit() {

    this.paymentPrice = this.paymentService.getCost();

    (window as any).paypal.Buttons(
      {
        style: {
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'paypal',
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: this.paymentPrice.toString(),
                    currency_code: 'USD'
                  }
                }
              ]
            }
          );
        },

        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) =>{
              // if(details.status === 'COMPLETED'){
              //   this.paymentPrice
              // }
            console.log(details);
            this.router.navigate(['/menu'])
            }
          );
        },
        onError: (error: any) => {
          console.log(error);
        }
      }
    ).render(this.paymentRef.nativeElement);
  }
}
