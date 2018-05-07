import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({username: '', password: ''});
  }

  prepareCredentials(): {username: string, password: string} {
    const formModel = this.form.value;
    return {
      'username': formModel.username as string,
      'password': formModel.password as string
    };
  }

  public onLoginClicked() {
    const credentials = this.prepareCredentials();
    return this.http.post<User>('/api/public/login', credentials)
      .subscribe(user => {
        this.auth.emitAuthStateChange(user);
        this.router.navigateByUrl('/reviews');
    });
  }

  // These will be used for validation in the template
  get username() {
    return this.form.get('username');
  }

  get password() {
    return this.form.get('password');
  }
}
