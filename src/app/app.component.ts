import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ItemcardComponent } from './itemcard/itemcard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PnfComponent } from './pnf/pnf.component';
import { ItemoverviewComponent } from './itemoverview/itemoverview.component';
import { FormsModule } from '@angular/forms';
import { ItemService } from './item.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ItemcardComponent,
    DashboardComponent,
    PnfComponent,
    RouterLink,
    ItemoverviewComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'og-app';
  username!: string | null;
  isLoggedIn: boolean;

  constructor(
    private router: Router,
    private itemService: ItemService,
    public loginService: LoginService
  ) {
    this.isLoggedIn = this.checkToken();
  }

  checkToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  ngOnInit() {
    // this.itemService.username$.subscribe((username) => {
    //   this.username = username;
    // });
    this.isLoggedIn = this.checkToken();
  }

  logout() {
    this.itemService.logout();
    this.loginService.loginSuccess = false;
    this.router.navigate(['/']);
  }

  opengithub() {
    window.open('https://github.com/nikhilrajganta/og-app', '_blank');
  }
}
