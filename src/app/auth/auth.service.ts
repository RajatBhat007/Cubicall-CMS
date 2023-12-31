import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private getisAuthenticated = false;

  constructor() {
    // Retrieve authentication status from localStorage on initialization
    this.getisAuthenticated =
      localStorage.getItem('isAuthenticated') === 'true';
  }

  login(uname: string, password: string): boolean {
    // Perform authentication logic and set isAuthenticated to true if successful
    this.getisAuthenticated = true;
    localStorage.setItem('isAuthenticated', 'true');

    return true;
  }

  logout(): void {
    this.getisAuthenticated = false;
    localStorage.removeItem('isAuthenticated');
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    return this.getisAuthenticated;
  }
}
