import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  cost!:  number;

  modifyCost(cost: number) {
    this.cost = cost;
  }

  getCost() {
    return this.cost;
  }
}
