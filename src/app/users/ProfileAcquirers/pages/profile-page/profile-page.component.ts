import {Component, OnInit, ViewChild} from '@angular/core';
import {ProfileComponent} from "../../components/profile/profile.component";
import {ConfirmationComponent} from "../../components/confirmation/confirmation.component";
import {TranslateModule} from "@ngx-translate/core";
import {ProfileApiService} from "../../services/profile-api.service";
import {take} from "rxjs";
import {HeaderComponent} from '../../../../public/components/header/header.component';
import {UserService} from '../../../../auth/services/user.service';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    ProfileComponent,
    ConfirmationComponent,
    TranslateModule,
    HeaderComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit {
  user: any;
  @ViewChild('confirmation') confirmation!: ConfirmationComponent;

  constructor(
    private userService: UserService,
    private profileApiService: ProfileApiService
  ) {}
  ngOnInit(): void {
    this.profileApiService.getMyProfile().subscribe(data => {
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

    this.profileApiService.updateProfile(payload)
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

