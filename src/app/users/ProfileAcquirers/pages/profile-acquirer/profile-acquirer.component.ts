import {HeaderComponent} from '../../../../public/components/header/header.component';
import {Component, inject, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {UserService} from '../../../../auth/services/user.service';
import {AuthenticationService} from '../../../../auth/services/authentication.service';
import {LogoApiService} from '../../../../shared/services/logo-api.service';

@Component({
  selector: 'app-profile-acquirer',
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    HeaderComponent,
    RouterLink,
  ],
  templateUrl: './profile-acquirer.component.html',
  styleUrl: './profile-acquirer.component.css'
})
export class ProfileAcquirerComponent implements OnInit{
  private id!: number;
  private Logo = inject(LogoApiService);
  user: any = {};  // Cambiado a un solo objeto
  options = [
    {path: '/editProfileAcquirer', title: 'sellereditProfile'}

  ]

  constructor(private userService: UserService, private authService: AuthenticationService) { }
  ngOnInit(): void {
    // Llamada al servicio para obtener un solo usuario
   this.id = this.authService.id
    this.userService.getbyId(this.id).subscribe(data => {
      this.user = data;
      console.log('Usuario obtenido:', this.user);
    });
  }
  getLogoUrl(url: string | undefined) {
    return this.Logo.getUrlToLogo(url);
  }
}
