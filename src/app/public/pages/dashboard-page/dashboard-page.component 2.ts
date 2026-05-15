import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../../../public/components/header/header.component";

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

}
