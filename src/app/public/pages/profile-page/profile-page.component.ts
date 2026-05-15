import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../auth/services/user.service";
import {User} from "../../../auth/model/user.entity";
import {HeaderComponent} from "../../components/header/header.component";
import {take} from "rxjs";
import {ConfirmationComponent} from '../../../users/ProfileAcquirers/components/confirmation/confirmation.component';
import {ProfileApiService} from '../../../users/ProfileAcquirers/services/profile-api.service';
import {ProfileComponent} from '../../../users/ProfileAcquirers/components/profile/profile.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileComponent,
    ConfirmationComponent,
    HeaderComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  user: any = null;
  @ViewChild('confirmation') confirmation!: ConfirmationComponent;

  constructor(private profileService: ProfileApiService) { }

  ngOnInit(): void {
    this.profileService.getMyProfile().subscribe({
      next: (data) => {
        this.user = data;
      },
      error: (err) => {
        if (err.status === 404) {
          this.user = { fullName: '', email: '', phoneNumber: '', ruc: '', planId: null };
        } else {
          console.error('Error loading profile:', err);
        }
      }
    });
  }

  userChange(updatedUser: any) {
    const nameParts = (updatedUser.fullName || '').split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || nameParts[0] || '';

    const payload = {
      firstName: firstName,
      lastName: lastName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      ruc: updatedUser.ruc,
      planId: updatedUser.planId
    };

    const isNewProfile = !this.user?.id;

    const request$ = isNewProfile
      ? this.profileService.createProfile(payload)
      : this.profileService.updateProfile(payload);

    request$
      .pipe(take(1))
      .subscribe({
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
