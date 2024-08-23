import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PnfComponent } from '../pnf/pnf.component';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    LandingPageComponent,
    DashboardComponent,
    PnfComponent,
    SignupComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {
  name: string | null = null;
  isLoggedIn: boolean;

  constructor() {
    this.isLoggedIn = this.checkToken();
  }

  checkToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  ngOnInit() {
    this.checktokenusername();
  }

  checktokenusername() {
    this.name = localStorage.getItem('username');
  }
}
