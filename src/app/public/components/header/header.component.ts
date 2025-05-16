import { Component } from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {LanguageSwitcherComponent} from "../language-switcher/language-switcher.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    RouterLink,
    LanguageSwitcherComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  options = [
    {path: '/myVehicles', title: 'My Vehicles'},
    {path: '/postVehicle', title: 'Post Vehicle'},
    {path:'/sellerProfile', title: 'My Profile'},
  ]
  optionsLogin = [
    {path:'/login', title: 'Log Out'}
    ]
}
