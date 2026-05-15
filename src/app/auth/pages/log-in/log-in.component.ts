import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthenticationService} from "../../services/authentication.service";
import {SignInRequest} from "../../model/sign-in.request";

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    FormsModule,
    NgIf
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent implements OnInit {
  form = {
    username: '',
    password: ''
  };

  loading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.errorMessage = '';
    this.loading = true;
    const signInRequest = new SignInRequest(this.form.username, this.form.password);

    this.authenticationService.signIn(signInRequest).subscribe({
      next: (response) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          this.loading = false;
          this.router.navigate(['/election']);
        } else {
          this.loading = false;
          this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
        }
      },
      error: (err) => {
        this.loading = false;
        if (err.status === 401 || err.status === 403) {
          this.errorMessage = 'Usuario o contraseña incorrectos.';
        } else {
          this.errorMessage = 'Error al conectar. Intenta de nuevo.';
        }
        console.error('Error al iniciar sesión:', err);
      }
    });
  }
}
