import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/User';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activeUser: User = null;

  constructor(
    private auth: AuthService
  ) {
    if (this.auth.userIsActive()) {
      this.auth.getActiveUserFromServer().subscribe(user => this.auth.emitAuthStateChange(user));
    }
    this.auth.authStateChangeEmitted$.subscribe(user => this.activeUser = user);
  }

  ngOnInit() {
  }

  public onLogoutClicked() {
    this.activeUser = null;
    this.auth.logoutUser();
  }

}
