import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignInRequest} from "../../model/sign-in.request";
import {ProfileApiService} from '../../../users/ProfileAcquirers/services/profile-api.service';
import {ProfileAccountService} from '../../../users/ProfileAcquirers/services/profile-account.service';


@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {
  form = {
    username: '',
    password: ''
  };

  profile = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: ''
  };

  submitted = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private profileService: ProfileApiService,
    private profileAccountService: ProfileAccountService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    console.log('Formulario enviado:', this.form);
    const signInRequest = new SignInRequest(this.form.username, this.form.password);

    this.authenticationService.signIn(signInRequest).subscribe({
      next: (response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.router.navigate(['/election']);
        } else {
          console.error('No se recibió un token válido.');
          alert('Credenciales incorrectas. Intenta de nuevo.');
          this.router.navigate(['/login']); // 👈 Fuerza retorno al login
        }
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        alert('Usuario o contraseña incorrectos.');
        this.router.navigate(['/login']); // 👈 También redirige manualmente en error
      }
    });
  }
}
