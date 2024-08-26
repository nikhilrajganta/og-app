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
  API = 'https://og-app-be.onrender.com';

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
    localStorage.removeItem('roleId');
    this.usernameSubject.next(null); // Clear the username
  }
  getAllItems(): Promise<item[]> {
    return fetch(`${this.API}/items`).then((res) => res.json());
  }

  getItemById(id: string): Promise<item> {
    return fetch(`${this.API}/items/${id}`).then((res) => res.json());
  }

  addItem(newItem: InewItem) {
    return fetch(`${this.API}/items`, {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }

  async deleteItem(items: item) {
    const res = await fetch(`${this.API}/items/${items.id}`, {
      method: 'DELETE',
    });
    return await res.json();
  }

  search(searchTerm: string): Observable<item[]> {
    // const searchTermLower = searchTerm.toLowerCase();
    console.log(searchTerm);
    return this.http.get<item[]>(`${this.API}/items?search=${searchTerm}`);
  }

  // search(searchTerm: string): Observable<item[]> {
  //   return this.http.get<item[]>(
  //     `http://localhost:4000/items?name_like=${searchTerm}`
  //   );
  // }

  editItem(editItem: item) {
    return fetch(`${this.API}/items/${editItem.id}`, {
      method: 'PUT',
      body: JSON.stringify(editItem),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }
}
