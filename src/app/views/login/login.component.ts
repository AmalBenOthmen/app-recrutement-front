import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { AuthenticationRequest } from '../../services/models/authentication-request';
import { AuthenticationService } from '../../services/services/authentication.service';

import {FormsModule} from "@angular/forms";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {TokenService} from "../../services/token/token.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    CommonModule,
    RouterModule
  ],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: string = '';
  isLoggedIn: boolean = false;

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
          console.log('Token received:', res.token);
          console.log('Role received:', res.role);

          // Store token
          this.tokenService.token = res.token;

          // Store role (if needed)
          // this.tokenService.role = res.role;

          this.isLoggedIn = true;

          if (res.role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
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
    this.tokenService.signOut();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }

  register() {
    this.router.navigate(['register']);
  }
}
