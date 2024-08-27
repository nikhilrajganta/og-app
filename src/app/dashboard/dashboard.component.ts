import { Component } from '@angular/core';
import { item, ItemService } from '../item.service';
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  startWith,
  debounceTime,
  switchMap,
  catchError,
  of,
  Observable,
} from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ItemcardComponent } from '../itemcard/itemcard.component';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ItemcardComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule,
    UpperCasePipe,
    CommonModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  allitems: Array<item> = [];
  filteredItems: any = [];
  searchForm!: FormGroup;
  isLoading: boolean = true;
  name: string | null = null;

  constructor(private fb: FormBuilder, private itemservice: ItemService) {
    this.searchForm = this.fb.group({
      search: '',
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
        this.filteredItems = data;
        this.isLoading = false;
      });
    this.checktokenusername();
  }

  checktokenusername() {
    this.name = localStorage.getItem('username');
  }

  loadItems() {
    this.isLoading = true;
    this.itemservice
      .getAllItems()
      .then((data) => {
        this.allitems = data;
        this.filteredItems = data;
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error loading items:', error);
        this.isLoading = false;
      });
  }

  deleteItemP(items: item) {
    this.itemservice.deleteItem(items).then(() => {
      this.loadItems();
    });
  }
}
