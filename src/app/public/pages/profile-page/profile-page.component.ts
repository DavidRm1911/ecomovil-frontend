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
  user: any;
  @ViewChild('confirmation') confirmation!: ConfirmationComponent;

  constructor(private profileService: ProfileApiService) { }

  ngOnInit(): void {
    this.profileService.getMyProfile().subscribe(data => {
      this.user = data;
    });
  }

  userChange(updatedUser: any) {
    const [firstName, lastName] = updatedUser.fullName.split(' ');

    const payload = {
      firstName: firstName || '',
      lastName: lastName || '',
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      ruc: updatedUser.ruc,
      planId: updatedUser.planId
    };

    this.profileService.updateProfile(payload)
      .pipe(take(1))  // <-- toma solo 1 emisión y se auto-cierra
      .subscribe({
        next: (data) => {
          console.log('✅ Perfil actualizado:', data);
          this.confirmation.message = 'Datos actualizados correctamente!';
          this.confirmation.show();
        },
        error: (err) => {
          console.error('❌ Error al actualizar perfil:', err);
        }
      });
  }
}
