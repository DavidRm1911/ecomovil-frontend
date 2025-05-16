import {Component, inject} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {NgIf} from "@angular/common";
import {HeaderComponent} from "../../components/header/header.component";
import {PlanListComponent} from '../../../plans/components/plan-list/plan-list.component';
import {PaymentComponent} from '../../../plans/components/payment/payment.component';
import {Plan} from '../../../plans/model/plan';
import {PlanesApiService} from '../../../plans/services/planes-api.service';

@Component({
  selector: 'app-planes-page',
  standalone: true,
  imports: [
    PlanListComponent,
    MatCard,
    MatCardContent,
    MatCardHeader,
    NgIf,
    PaymentComponent,
    HeaderComponent
  ],
  templateUrl: './planes-page.component.html',
  styleUrl: './planes-page.component.css'
})
export class PlanesPageComponent {
  planes: Array<Plan> = [];
  private planesApi: PlanesApiService = inject(PlanesApiService);

  constructor() {
    this.getPlans();
  }

  getPlans(){
    this.planesApi.getSources().subscribe((data: any) => {

      this.planes = data;
    })
  }

}
