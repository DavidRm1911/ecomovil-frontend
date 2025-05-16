import { Component } from '@angular/core';
import {MatButton, MatAnchor} from "@angular/material/button";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {RouterLink} from "@angular/router";
import {LanguageSwitcherComponent} from "../language-switcher/language-switcher.component";

@Component({
  selector: 'app-header-acquirer',
  standalone: true,
    imports: [
        MatButton,
        MatMenu,
        MatMenuItem,
        MatMenuTrigger,
        MatAnchor,
        RouterLink,
        LanguageSwitcherComponent
    ],
  templateUrl: './header-acquirer.component.html',
  styleUrl: './header-acquirer.component.css'
})
export class HeaderAcquirerComponent {
  options = [
    {path: '/home', title: 'Home'},
    {path: '/interactiveMap', title: 'Map'},
    {path:'/filter', title: 'Filter'}
  ]
  optionsLogin = [
    {path:'/login', title: 'Log Out'}
  ]

}
