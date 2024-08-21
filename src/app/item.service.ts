import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { resolveTypeReferenceDirective } from 'typescript';

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
  private usernameSubject = new BehaviorSubject<string | null>(null);
  username$ = this.usernameSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      this.usernameSubject.next(storedUsername);
    }
  }

  login(username: string, token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    this.usernameSubject.next(username); // Update the username
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.usernameSubject.next(null); // Clear the username
  }
  getAllItems(): Promise<item[]> {
    return fetch('https://og-app-be.onrender.com/items').then((res) =>
      res.json()
    );
  }

  getItemById(id: string): Promise<item> {
    return fetch(`https://og-app-be.onrender.com/items/${id}`).then((res) =>
      res.json()
    );
  }

  addItem(newItem: InewItem) {
    return fetch(`https://og-app-be.onrender.com/items`, {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }

  async deleteItem(items: item) {
    const res = await fetch(
      `https://og-app-be.onrender.com/items/${items.id}`,
      {
        method: 'DELETE',
      }
    );
    return await res.json();
  }

  search(searchTerm: string): Observable<item[]> {
    return this.http.get<item[]>(
      `https://669a42a59ba098ed61fef807.mockapi.io/movies?search=${searchTerm}`
    );
  }

  editItem(editItem: item) {
    return fetch(`https://og-app-be.onrender.com/items${editItem.id}`, {
      method: 'PUT',
      body: JSON.stringify(editItem),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }
}
