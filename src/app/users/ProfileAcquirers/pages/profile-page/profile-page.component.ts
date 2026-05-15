import {Component, OnInit, ViewChild} from '@angular/core';
import {ProfileComponent} from "../../components/profile/profile.component";
import {ConfirmationComponent} from "../../components/confirmation/confirmation.component";
import {TranslateModule} from "@ngx-translate/core";
import {ProfileApiService} from "../../services/profile-api.service";
import {take} from "rxjs";
import {HeaderComponent} from '../../../../public/components/header/header.component';
import {UserService} from '../../../../auth/services/user.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileComponent,
    ConfirmationComponent,
    TranslateModule,
    HeaderComponent,
    NgIf
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  user: any = null;
  @ViewChild('confirmation') confirmation!: ConfirmationComponent;

  constructor(
    private userService: UserService,
    private profileApiService: ProfileApiService
  ) {}

  ngOnInit(): void {
    this.profileApiService.getMyProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        if (err.status === 404) {
          this.user = { fullName: '', email: '', phoneNumber: '', ruc: '', planId: null };
        } else {
          console.error('Error loading profile:', err);
          this.user = { fullName: '', email: '', phoneNumber: '', ruc: '', planId: null };
        }
      }
    });
  }

  userChange(updatedUser: any) {
    const parts = (updatedUser.fullName || '').trim().split(' ');
    const firstName = parts[0] || '';
    const lastName = parts.slice(1).join(' ') || parts[0] || '';

    const payload = {
      firstName,
      lastName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      ruc: updatedUser.ruc,
      planId: updatedUser.planId ?? null
    };

    const isNewProfile = !this.user?.id;
    const request$ = isNewProfile
      ? this.profileApiService.createProfile(payload)
      : this.profileApiService.updateProfile(payload);

    request$.pipe(take(1)).subscribe({
      next: (data) => {
        this.user = data;
        this.confirmation.message = 'Datos actualizados correctamente!';
        this.confirmation.show();
      },
      error: (err) => {
        console.error('Error al guardar perfil:', err);
      }
    });
  }
}
