import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

export interface user {
  firstName: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  BASE_URL = 'http://localhost:63145/auth';
  NAME_KEY = 'name';
  TOKEN_KEY = 'token';
  constructor(private http: HttpClient, private router: Router) {}

  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  login(loginData) {
    this.http
      .post<user>(this.BASE_URL + '/login', loginData)
      .subscribe((res) => {
        console.log(res);
      });
  }

  register(user) {
    delete user._password;
    console.log(user);
    this.http.post<user>(this.BASE_URL + '/register', user).subscribe((res) => {
      var authResponse = res;
      if (!authResponse.token) return;
      console.log(authResponse);
      localStorage.setItem(this.TOKEN_KEY, authResponse.token);
      localStorage.setItem(this.NAME_KEY, authResponse.firstName);
      this.router.navigate(['/']);
    });
  }
  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
