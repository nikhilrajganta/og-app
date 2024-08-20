import { Component } from '@angular/core';
import { item, ItemService } from '../item.service';
import { ActivatedRoute } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-itemoverview',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './itemoverview.component.html',
  styleUrl: './itemoverview.component.scss',
})
export class ItemoverviewComponent {
  item!: item;
  msg = '';

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute // DI
  ) {}

  // After Initialization of the component
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id') as string; // From URL

    this.itemService
      .getItemById(id)
      .then((data) => {
        this.item = data; // Model
      })
      .catch(() => {
        this.msg = 'Something went wrong 🥲';
      });
  }
}
