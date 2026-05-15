import { Component } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatMenu, MatMenuItem, MatMenuTrigger } from "@angular/material/menu";
import { MatDivider } from "@angular/material/divider";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgIf } from "@angular/common";
import { LanguageSwitcherComponent } from "../language-switcher/language-switcher.component";
import { AuthenticationService } from '../../../auth/services/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatButton,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatDivider,
    RouterLink,
    RouterLinkActive,
    NgIf,
    LanguageSwitcherComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  mobileOpen = false;

  constructor(private authService: AuthenticationService) {}

  signOut() {
    this.authService.signOut();
  }

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }
}
