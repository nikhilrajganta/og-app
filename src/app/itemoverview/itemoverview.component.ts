import { Component, Input } from '@angular/core';
import { item, ItemService } from '../item.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-itemoverview',
  standalone: true,
  imports: [CurrencyPipe, CommonModule],
  templateUrl: './itemoverview.component.html',
  styleUrl: './itemoverview.component.scss',
})
export class ItemoverviewComponent {
  @Input() item!: item;
  // item!: item;
  msg = '';
  isLoading: boolean = true;

  constructor(
    private itemService: ItemService,
    private route: ActivatedRoute // DI
  ) {}

  // After Initialization of the component
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id') as string;

    this.itemService
      .getItemById(id)
      .then((data) => {
        this.item = data;
        this.isLoading = false;
      })
      .catch(() => {
        this.msg = 'Something went wrong 🥲';
        this.isLoading = false;
      });
  }
}
