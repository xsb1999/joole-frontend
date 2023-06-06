import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  saveToken(token: string): void {
    localStorage.setItem('jwtToken', token);
  }

  getToken(): any {
    return localStorage.getItem('jwtToken');
  }

  logout(): void {
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }



}
