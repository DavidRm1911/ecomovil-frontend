import { Component, inject, OnInit, ViewChild} from '@angular/core';
import {HeaderAcquirerComponent} from "../../components/header-acquirer/header-acquirer.component";
import {UserService} from "../../../auth/services/user.service";
import {ConfirmationComponent} from '../../../users/ProfileAcquirers/components/confirmation/confirmation.component';
import {ProfileComponent} from '../../../users/ProfileAcquirers/components/profile/profile.component';

@Component({
  selector: 'app-edit-profile-acquirer',
  standalone: true,
  imports: [
    ConfirmationComponent,
    ProfileComponent,
    HeaderAcquirerComponent
  ],
  templateUrl: './edit-profile-acquirer.component.html',
  styleUrl: './edit-profile-acquirer.component.css'
})
export class EditProfileAcquirerComponent implements OnInit {
  user: any;
  @ViewChild('confirmation') confirmation!: ConfirmationComponent;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserById(1).subscribe(data => {
      this.user = data;
    });
  }

  userChange(updatedUser: any) {
    this.userService.updateUser(this.user.id, updatedUser).subscribe((data: any) => {
      console.log('Usuario actualizado:', data);

      this.confirmation.message = 'Datos actualizados correctamente!';
      this.confirmation.show();
    });
  }
}
