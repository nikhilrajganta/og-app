import { Component } from '@angular/core';
import { item, ItemService } from '../item.service';
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { startWith, debounceTime, switchMap, catchError, of } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ItemcardComponent } from '../itemcard/itemcard.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ItemcardComponent,
    FormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  allitems!: Array<item>;
  filteredItems: Array<item> = [];
  searchForm!: FormGroup;

  updateFilteredItems(items: Array<item>) {
    this.filteredItems = items;
  }
  constructor(private fb: FormBuilder, private itemservice: ItemService) {
    this.searchForm = this.fb.group({
      search: 'car',
    });
  }

  ngOnInit() {
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        switchMap((searchTerm) =>
          this.itemservice.search(searchTerm).pipe(
            catchError((err) => {
              console.log(err);
              return of([]);
            })
          )
        )
      )
      .subscribe((data) => {
        console.log(data);
        this.allitems = data;
      });
    this.loadItems();
  }
  loadItems() {
    this.itemservice.getAllItems().then((data) => (this.allitems = data));
  }

  deleteItemP(items: item) {
    this.itemservice.deleteItem(items).then(() => {
      this.loadItems();
    });
  }
}
