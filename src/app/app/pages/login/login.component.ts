import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  public onLoginClicked() {
    const credentials = { 'username': 'koki96', 'password': 'kostadin' };
    this.authService.loginUser(credentials);
  }

}
