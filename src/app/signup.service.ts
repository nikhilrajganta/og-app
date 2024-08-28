import { Injectable } from '@angular/core';
import { item } from './item.service';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  username = '';
  constructor() {}
  async signup(credentials: item) {
    return fetch('https://og-app-be.onrender.com/user/signup', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        this.username = data.msg;
      });
  }
}
