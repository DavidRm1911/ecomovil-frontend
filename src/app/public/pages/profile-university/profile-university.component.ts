import {Component, inject, OnInit} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {LogoApiService} from "../../../shared/services/logo-api.service";
import { MatCard, MatCardActions, MatCardAvatar, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle } from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {RouterLink} from "@angular/router";
import {HeaderComponent} from "../../components/header/header.component";
import {TranslateModule} from "@ngx-translate/core";
import {UserService} from "../../../auth/services/user.service";
import {AuthenticationService} from "../../../auth/services/authentication.service";
import {HeaderAcquirerComponent} from "../../components/header-acquirer/header-acquirer.component";
import {ProfileApiService} from '../../../users/ProfileAcquirers/services/profile-api.service';

@Component({
  selector: 'app-profile-university',
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
    TranslateModule,
    HeaderComponent,
    HeaderAcquirerComponent
  ],
  templateUrl: './profile-university.component.html',
  styleUrl: './profile-university.component.css'
})

export class ProfileUniversityComponent implements OnInit {
  private id!: number;
  private Logo = inject(LogoApiService);
  user: any = {};  // Cambiado a un solo objeto
  options = [
      {path: '/sellereditProfile', title: 'sellereditProfile'}

  ]

  constructor(private profileService: ProfileApiService,private userService: UserService, private authService: AuthenticationService) { }
    ngOnInit(): void {
        // Llamada al servicio para obtener un solo usuario
      this.profileService.getMyProfile().subscribe(data => {
        this.user = data;
        console.log('Perfil obtenido:', this.user);
      });
    }
  getLogoUrl(url: string | undefined) {
    return this.Logo.getUrlToLogo(url);
  }
  getFirstName(fullName: string): string {
    return fullName?.split(' ')[0] || '';
  }
}
