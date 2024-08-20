import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface item {
  id: string;
  name: string;
  description: string;
  price: number;
  banner_img: string;
  cover_img: string;
  location: string;
}
export type InewItem = Omit<item, 'id'>;

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}
  getAllItems(): Promise<item[]> {
    return fetch('http://localhost:4000/items').then((res) => res.json());
  }

  getItemById(id: string): Promise<item> {
    return fetch(`http://localhost:4000/items/${id}`).then((res) => res.json());
  }

  addItem(newItem: InewItem) {
    return fetch(`http://localhost:4000/items`, {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }

  async deleteItem(items: item) {
    const res = await fetch(`http://localhost:4000/items/${items.id}`, {
      method: 'DELETE',
    });
    return await res.json();
  }

  search(searchTerm: string) {
    return this.http.get<item[]>(
      `http://localhost:4000/items?search=${searchTerm}`
    );
  }

  editItem(editItem: item) {
    return fetch(`http://localhost:4000/items/${editItem.id}`, {
      method: 'PUT',
      body: JSON.stringify(editItem),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }
}
