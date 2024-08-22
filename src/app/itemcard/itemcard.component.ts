import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { item, ItemService } from '../item.service';
import { AppComponent } from '../app.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-itemcard',
  standalone: true,
  imports: [
    AppComponent,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    CurrencyPipe,
    CommonModule,
  ],
  templateUrl: './itemcard.component.html',
  styleUrl: './itemcard.component.scss',
})
export class ItemcardComponent {
  constructor(public iteminfo: ItemService, private router: Router) {
    this.isLoggedIn = this.checkToken();
  }
  @Input() id!: string;

  @Output() deleteItemEvent: EventEmitter<item> = new EventEmitter<item>();

  isLoggedIn: boolean;

  checkToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  openItemOverview() {
    this.router.navigate(['/overview', this.item.id]);
  }

  deleteItem() {
    this.deleteItemEvent.emit(this.item);
  }

  canEditOrDelete(): boolean {
    const roleId = localStorage.getItem('roleId');
    const username = localStorage.getItem('username');
    if (roleId) {
      // Parse the stored JSON
      return roleId === '0' || this.item.name === username; // Return true if roleId is '0'
    }
    return false;
  }

  @Input() item = {
    id: '',
    name: 'Rolex Watch Spider Man Edition',
    cover_img: 'https://example.com/images/cover_backpack.jpg',
    banner_img: 'https://example.com/images/banner_backpack.jpg',
    location: 'New York, NY',
    price: 1000,
    description:
      'A stylish and durable backpack perfect for school, work, or travel. Features multiple compartments and a comfortable padded back.',
  };
}
