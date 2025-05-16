import {Component, inject, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {UserService} from "../../../auth/services/user.service";
import {LogoApiService} from "../../../shared/services/logo-api.service";
import { MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle } from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {RouterLink} from "@angular/router";

import {HeaderAcquirerComponent} from "../../components/header-acquirer/header-acquirer.component";

@Component({
  selector: 'app-profile-acquirer',
  standalone: true,
  imports: [
    NgIf,
    NgOptimizedImage,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatCardAvatar,
    MatCardTitle,
    MatCardSubtitle,
    MatButton,
    MatCheckbox,
    RouterLink,
    HeaderAcquirerComponent
  ],
  templateUrl: './profile-acquirer.component.html',
  styleUrl: './profile-acquirer.component.css'
})
export class ProfileAcquirerComponent implements OnInit{
  private Logo = inject(LogoApiService);
  user: any = {};  // Cambiado a un solo objeto
  options = [
    {path: '/editProfileAcquirer', title: 'sellereditProfile'}

  ]

  constructor(private userService: UserService) { }
  ngOnInit(): void {
    // Llamada al servicio para obtener un solo usuario
    this.userService.getUserById(1).subscribe(data => {
      this.user = data;
      console.log('Usuario obtenido:', this.user);
    });
  }
  getLogoUrl(url: string | undefined) {
    return this.Logo.getUrlToLogo(url);
  }
}
