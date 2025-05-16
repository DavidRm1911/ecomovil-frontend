import {Component, inject} from '@angular/core';
import {PlanesApiService} from "../../services/planes-api.service";
import {Plan} from "../../model/plan";
import {PlanListComponent} from "../../components/plan-list/plan-list.component";
import {HeaderComponent} from "../../../public/components/header/header.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-planes-page',
  standalone: true,
    imports: [
        PlanListComponent,
        TranslateModule,
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
