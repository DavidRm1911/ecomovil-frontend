import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";
import {HeaderComponent} from "./public/components/header/header.component";
import {HeaderAcquirerComponent} from "./public/components/header-acquirer/header-acquirer.component";
import {LogInComponent} from "./auth/pages/log-in/log-in.component";
import {RegisterUniversityStudentComponent} from "./public/pages/register-university-student/register-university-student.component";
import {VehiclesComponent} from './vehicles/pages/vehicles/vehicles.component';
import {VehiclePostComponent} from './vehicles/pages/vehicle-post/vehicle-post.component';
import {InteractiveMapComponent} from './public/pages/interactive-map/interactive-map.component';
import {VehicleDetailsComponent} from './vehicles/pages/vehicle-details/vehicle-details.component';
import {PlanesPageComponent} from './plans/pages/planes-page/planes-page.component';
import {RegisterAcquirerComponent} from './public/pages/register-acquirer/register-acquirer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatMenu, MatMenuItem, MatButton, MatMenuTrigger, NgIf,
    HeaderComponent, HeaderAcquirerComponent, VehiclesComponent, VehiclePostComponent,
    InteractiveMapComponent, VehicleDetailsComponent, PlanesPageComponent, LogInComponent,
    RegisterUniversityStudentComponent, RegisterAcquirerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'EcoMovil';
  menuOpen = false;

  constructor(private router: Router, private translate: TranslateService) {
    this.translate.setDefaultLang('en');

  }

  ngOnInit() {

    this.translate.use('en');
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        const fragment = this.router.parseUrl(this.router.url).fragment;
        if (fragment) {
          this.smoothScrollTo(fragment);
        }
      }
    });
  }

  smoothScrollTo(fragment: string) {
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
