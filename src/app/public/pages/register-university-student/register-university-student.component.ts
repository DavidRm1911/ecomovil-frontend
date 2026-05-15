import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {AuthenticationService} from "../../../auth/services/authentication.service";
import {SignUpRequest} from "../../../auth/model/sign-up.request";
import {SignInRequest} from "../../../auth/model/sign-in.request";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ProfileApiService} from '../../../users/ProfileAcquirers/services/profile-api.service';

@Component({
  selector: 'app-register-university-student',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    FormsModule,
    NgIf
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
    ruc: '',
    phoneNumber: ''
  };

  submitted = false;
  loading = false;
  errorMessage = '';

  constructor(
    private authenticationService: AuthenticationService,
    private profileApiService: ProfileApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form.role.push('ROLE_ADMIN');
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.loading = true;

    const parts = this.form.username.trim().split(' ');
    const firstName = parts[0] || this.form.username;
    const lastName = parts.slice(1).join(' ') || parts[0];

    const signUpRequest = new SignUpRequest(this.form.username, this.form.password, this.form.email);

    this.authenticationService.signUp(signUpRequest).subscribe({
      next: () => {
        const signInRequest = new SignInRequest(this.form.username, this.form.password);
        this.authenticationService.signIn(signInRequest).subscribe({
          next: () => {
            const profileData = {
              firstName,
              lastName,
              email: this.form.email,
              phoneNumber: this.form.phoneNumber,
              ruc: this.form.ruc,
              planId: null
            };
            this.profileApiService.createProfile(profileData).subscribe({
              next: () => {
                this.loading = false;
                this.submitted = true;
                this.router.navigate(['/plans']);
              },
              error: (err: any) => {
                this.loading = false;
                console.error('Error creating profile:', err);
                this.router.navigate(['/plans']);
              }
            });
          },
          error: (err: any) => {
            this.loading = false;
            this.errorMessage = 'Error al iniciar sesión después del registro. Intenta de nuevo.';
            console.error('Error signing in after registration:', err);
          }
        });
      },
      error: (err: any) => {
        this.loading = false;
        if (err.status === 409 || err.error?.message?.includes('already exists')) {
          this.errorMessage = 'El usuario ya existe. Prueba con otro nombre de usuario.';
        } else {
          this.errorMessage = 'Error al registrarse. Verifica los datos e intenta de nuevo.';
        }
        console.error('Error during sign up:', err);
      }
    });
  }
}
