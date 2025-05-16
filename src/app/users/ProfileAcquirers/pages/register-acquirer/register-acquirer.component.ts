import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {ProfileAccountService} from "../../services/profile-account.service";
import {NgIf} from "@angular/common";
import {AuthenticationService} from '../../../../auth/services/authentication.service';
import {SignUpRequest} from '../../../../auth/model/sign-up.request';

@Component({
  selector: 'app-register-acquirer',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './register-acquirer.component.html',
  styleUrl: './register-acquirer.component.css'
})
export class RegisterAcquirerComponent implements OnInit {

  form = {
    username: '',
    password: '',
    email: '',
    role: [] as string[]
  }
  profile = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  }

  submitted: boolean = false;
  termsAccepted: boolean = false;
  showTermsModal = false;

  openTermsModal(){
    this.showTermsModal = true;
  }

  closeTermsModal(){
    this.showTermsModal = false;
  }

  constructor(private authenticationService: AuthenticationService, private profileAccountService: ProfileAccountService) { }
  ngOnInit(): void {
    this.form.role.push('ROLE_ADMIN');
  }

  onSubmit(): void {
    if (!this.termsAccepted) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    const { username, password, email } = this.form;
    const signUpRequest = new SignUpRequest(username, password, email);

    this.authenticationService.signUp(signUpRequest).subscribe({
      next: () => {
        this.profile.firstName = username;
        this.profile.lastName = username;
        this.profile.email = email;
        this.profile.phoneNumber = '000000000';

        this.profileAccountService.addAccount(this.profile); // ✅ Ya no es un Observable
        this.submitted = true;
        window.location.href = '/login'; // O mejor: this.router.navigate(['/login']);
      },
      error: err => {
        alert('Error al registrarse');
        console.error(err);
      }
    });
  }
}
