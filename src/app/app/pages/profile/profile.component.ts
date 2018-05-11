import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  activeUser: User = null;

  constructor(
    private auth: AuthService
  ) {
    this.activeUser = this.auth.authStateSource.value;
    this.auth.authStateChangeEmitted$.subscribe(
      user => (this.activeUser = user)
    );
   }

  ngOnInit() {
  }

}
