import { Router, ActivatedRoute } from '@angular/router';
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
  redirectBackTo = '';

  constructor(
    private auth: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.redirectBackTo = this.route.snapshot.queryParams['redirectBackTo'];
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
        if (this.redirectBackTo) {
          console.log('ovde treba: ', this.redirectBackTo);
          this.router.navigateByUrl(this.redirectBackTo);
        } else {
          console.log('onde');
          this.router.navigateByUrl('/reviews');
        }
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
