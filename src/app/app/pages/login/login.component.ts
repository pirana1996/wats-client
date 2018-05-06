import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() open: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public onLoginClicked() {
    const credentials = { 'username': 'koki96', 'password': 'kostadin' };
    return this.http.post<User>('/api/public/login', credentials)
      .subscribe(user => {
        this.authService.setActiveUser(user);
        this.open.emit(null);
        this.router.navigateByUrl('/');
    });
  }

}
