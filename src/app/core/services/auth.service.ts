import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../../app/models/User';
import { Router } from '@angular/router';
import { of } from 'rxjs/observable/of';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

  private activeUser: Observable<User> = null;

  public authStateSource = new BehaviorSubject<User>(null);
  authStateChangeEmitted$ = this.authStateSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router) {
      console.log('AuthService::contrictor invoked');
  }

  emitAuthStateChange(change: any) {
    this.authStateSource.next(change);
  }

  getActiveUserFromServer(): Observable<User> {
    return this.http.get<User>('/api/user');
  }

  public userIsActive(): boolean {
    return this.getToken() != null;
  }

  public logoutUser() {
    localStorage.removeItem('jwtToken');
    this.authStateSource.next(null);
  }

  public getToken(): string {
    console.log('Retrieving token from in local storage');
    return localStorage.getItem('jwtToken');
  }

  public storeToken(token: string) {
    console.log(`Storing token in local storage`);
    localStorage.setItem('jwtToken', token);
  }

}
