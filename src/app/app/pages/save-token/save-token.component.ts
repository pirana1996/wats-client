import { AuthService } from './../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-token',
  templateUrl: './save-token.component.html',
  styleUrls: ['./save-token.component.css']
})
export class SaveTokenComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    const jwtToken = this.route.snapshot.queryParams['jwt'];
    if (jwtToken) {
      this.authService.storeToken(jwtToken);
      this.authService.getActiveUserFromServer()
      .subscribe(user => this.authService.emitAuthStateChange(user));
    }
    this.router.navigateByUrl('/location/1/reviews');
   }
}
