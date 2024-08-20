import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ItemcardComponent } from './itemcard/itemcard.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PnfComponent } from './pnf/pnf.component';
import { ItemoverviewComponent } from './itemoverview/itemoverview.component';

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
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'og-app';
}
