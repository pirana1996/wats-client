import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
// import { Observable } from 'rxjs/Rx';
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

  constructor(private http: HttpClient,
              private router: Router) { console.log('AuthService::contrictor invoked'); }

  public setActiveUser(user: User) {
    this.activeUser = of(user);
  }

  public getActiveUser(): Observable<User> {
    return this.activeUser !== null ? this.activeUser : this.http.get<User>('/api/user');
  }

  public userIsActive(): boolean {
    return this.getToken() != null;
  }

  public logoutUser() {
    localStorage.removeItem('jwtToken');
    this.activeUser = null;
  }

  public getToken(): string {
    console.log('Retrieving token from in local storage');
    return localStorage.getItem('jwtToken');
  }

  public storeToken(token: string) {
    console.log(`Storing token ${token} in local storage`);
    localStorage.setItem('jwtToken', token);
  }

}
