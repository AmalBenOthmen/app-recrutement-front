import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationRequest } from '../../services/models/authentication-request';
import { AuthenticationService } from '../../services/services/authentication.service';
import { TokenService } from '../../services/token/token.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  styleUrls: ['./login.component.scss'],
  providers: [AuthenticationService]
})
export class LoginComponent {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: string = '';
  isLoggedIn: boolean = false; // Définir la variable ici

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  login(): void {
    this.errorMsg = '';
    this.authService.authenticate({ body: this.authRequest }).subscribe({
      next: (res) => {
        if (res.token && res.role) {
          this.tokenService.token = res.token;
          this.isLoggedIn = true; // Mise à jour de l'état de connexion
          const role = res.role;
          console.log(role);

          if (role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/contact']);
          }
        } else {
          this.errorMsg = 'Invalid response from server';
        }
      },
      error: (err) => {
        console.error(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors[0];
        } else {
          this.errorMsg = err.error.errorMsg;
        }
      }
    });
  }

  logout(): void {
    this.tokenService.token = '';
    this.isLoggedIn = false; // Mise à jour de l'état de connexion
    this.router.navigate(['/']);
  }

  register() {
    this.router.navigate(['register']);
  }
}
