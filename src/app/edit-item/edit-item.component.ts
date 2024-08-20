import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { ActivatedRoute, Router } from '@angular/router';
import { item, ItemService } from '../item.service';

@Component({
  selector: 'app-edit-item',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
  ],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.scss',
})
export class EditItemComponent {
  itemForm: FormGroup;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router
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

    this.id = this.route.snapshot.paramMap.get('id') || '';
  }

  ngOnInit() {
    if (this.id) {
      this.itemService.getItemById(this.id).then((recipe) => {
        this.itemForm.patchValue(recipe);
      });
    }
  }

  editItem() {
    if (this.itemForm.valid) {
      let reciteItem: item = {
        id: this.id,
        ...this.itemForm.value,
      };

      this.itemService.editItem(reciteItem).then(() => {
        this.router.navigate(['/items']);
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
