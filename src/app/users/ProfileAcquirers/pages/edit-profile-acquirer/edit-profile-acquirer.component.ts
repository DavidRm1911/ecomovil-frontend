import { Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationComponent} from "../../components/confirmation/confirmation.component";
import {ProfileComponent} from "../../components/profile/profile.component";
import {TranslateModule} from "@ngx-translate/core";
import {HeaderAcquirerComponent} from '../../../../public/components/header-acquirer/header-acquirer.component';
import {UserService} from '../../../../auth/services/user.service';

@Component({
  selector: 'app-edit-profile-acquirer',
  standalone: true,
  imports: [
    ConfirmationComponent,
    ProfileComponent,
    TranslateModule,
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
    this.userService.getbyId(1).subscribe(data => {
      this.user = data;
    });
  }

  userChange(updatedUser: any) {
    this.userService.update(this.user.id, updatedUser).subscribe((data: any) => {
      console.log('Usuario actualizado:', data);

      this.confirmation.message = 'Datos actualizados correctamente!';
      this.confirmation.show();
    });
  }
}
