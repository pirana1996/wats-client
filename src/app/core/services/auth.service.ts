import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  public loginUser(credentials) {
    console.log('post');
    // return this.http.post('/api/public/login', credentials);
  }

  public getToken(): string {
    return '[token-template]';
  }

  public storeToken(token: string) {
  }

}
