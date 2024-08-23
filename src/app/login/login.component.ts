import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../login.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  async login() {
    if (this.loginForm.valid) {
      try {
        const data = await this.loginService.login(this.loginForm.value);

        if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
          localStorage.setItem('roleId', data.roleId);
          this.loginService.loginSuccess = true;
          this.router.navigate(['/items']);
        } else {
          this.errorMessage = 'User does not exist';
        }
      } catch (err) {
        this.errorMessage = 'User does not exist';
        console.error({ msg: 'User not exist', err });
      }
    }
  }

  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
