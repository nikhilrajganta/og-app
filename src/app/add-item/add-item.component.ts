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
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { InewItem, item, ItemService } from '../item.service';

@Component({
  selector: 'app-add-item',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
  ],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
})
export class AddItemComponent {
  allItems: Array<item> = [];
  itemForm!: FormGroup;
  constructor(
    public itemservice: ItemService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      banner_img: [
        '',
        [Validators.required, Validators.pattern(/^https:\/\/.*/)],
      ],
      cover_img: [
        '',
        [Validators.required, Validators.pattern(/^https:\/\/.*/)],
      ],
      price: [],
      location: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  addItem() {
    if (this.itemForm.valid) {
      let newItem: InewItem = this.itemForm.value;

      this.itemservice.addItem(newItem).then(() => {
        this.router.navigate(['items']);
      });
    }
  }

  get name() {
    return this.itemForm.get('name');
  }
  get banner_img() {
    return this.itemForm.get('banner_img');
  }
  get cover_img() {
    return this.itemForm.get('cover_img');
  }
  get location() {
    return this.itemForm.get('location');
  }
  get description() {
    return this.itemForm.get('description');
  }
  get price() {
    return this.itemForm.get('price');
  }
}
