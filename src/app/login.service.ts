import { Injectable } from '@angular/core';

export interface User {
  userName: string;
  password: string;
}

export interface TokenResponse {
  msg: string;
  token: string;
  roleId: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginSuccess: boolean = false;
  constructor() {}

  async login(credentials: User): Promise<TokenResponse> {
    return fetch('https://og-app-be.onrender.com/user/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-type': 'application/json',
      },
    }).then((res) => res.json());
  }
}
