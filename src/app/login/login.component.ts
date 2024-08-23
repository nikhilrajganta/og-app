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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm!: FormGroup;
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

  login() {
    // console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      try {
        this.loginService.login(this.loginForm.value).then((data) => {
          localStorage.setItem('token', data.token);
          // localStorage.setItem('roleId', data.roleId);
          localStorage.setItem('username', data.username);
          localStorage.setItem('roleId', data.roleId);
          this.loginService.loginSuccess = true;
          this.router.navigate(['/items']);
        });
      } catch (err) {
        console.error({ msg: 'user not exist' });
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
