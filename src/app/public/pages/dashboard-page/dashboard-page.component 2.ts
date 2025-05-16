import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderAcquirerComponent} from "../../components/header-acquirer/header-acquirer.component";

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderAcquirerComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

}
