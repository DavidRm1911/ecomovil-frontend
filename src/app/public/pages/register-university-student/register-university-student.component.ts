import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {AuthenticationService} from "../../../auth/services/authentication.service";
import {SignUpRequest} from "../../../auth/model/sign-up.request";
import {FormsModule} from "@angular/forms";
import {ProfileAccountService} from '../../../users/ProfileAcquirers/services/profile-account.service';

@Component({
  selector: 'app-register-university-student',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './register-university-student.component.html',
  styleUrl: './register-university-student.component.css'
})
export class RegisterUniversityStudentComponent implements OnInit {
  form = {
    username: '',
    password: '',
    email: '',
    role: [] as string[],
    ruc: ''
  }

  profile = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  }

  submitted: boolean = false;
  constructor(private authenticationService: AuthenticationService, private profileAccountService: ProfileAccountService) { }
  ngOnInit(): void {
    this.form.role.push('ROLE_ADMIN');
  }
  onSubmit(): void {
    // if (this.form.invalid) return;
    let username = this.form.username;
    let password = this.form.password;
    let email = this.form.email;
    let ruc = this.form.ruc;
    const signUpRequest = new SignUpRequest(username, password, email);
    this.authenticationService.signUp(signUpRequest);
    this.profile.firstName=username;
    this.profile.lastName=username;
    this.profile.email=email;
    this.profile.phoneNumber='';
    this.profileAccountService.addAccount(this.profile);
    this.submitted = true;
  }
}
