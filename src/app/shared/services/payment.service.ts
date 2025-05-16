import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  price!:  number;

  modifyCost(price: number) {
    this.price = price;
  }

  getCost() {
    return this.price;
  }
}
