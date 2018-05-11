// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Location } from './../../../app/models/Location';
import { LocationService } from '../../../core/services/location.service';
import { ActivatedRoute, Router, NavigationStart, NavigationExtras } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';
import { Component, OnInit } from '@angular/core';
import { PageInfo } from '../../../app/models/page-info.model';
import { User } from '../../../app/models/User';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  pageInfo: PageInfo;
  reviews: BehaviorSubject<Review[]> = new BehaviorSubject(null);
  numbers: number[] = [];
  showForm = false;
  activeUser: User = null;
  location = new BehaviorSubject(null); // to control it in the template
  showNotLoggedIn = false;
  couldNotLoad = false;

  constructor(
    private reviewService: ReviewService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
  ) {
    this.activeUser = this.auth.authStateSource.value;
    this.auth.authStateChangeEmitted$.subscribe(
      user => (this.activeUser = user)
    );
  }

  ngOnInit() {
    let page;
    let size;
    this.route.queryParamMap.subscribe(map => {
      page = map.get('page');
      page = page ? page : 0;
      size = map.get('size');
      size = size ? size : 20;
      const locationId = this.route.snapshot.params['locationId'];
      if (!this.location.value) {
        this.locationService.getLocation(locationId).subscribe(location => {
          this.location.next(location);
        });
      }
      this.getReviews(locationId, page);
    });
  }

  private getReviews(locationId: number, page: number) {
    this.reviewService
      .getReviewsByLocationSoredByDateDesc(locationId, page)
      .subscribe(it => {
        if (it) {
          const { content, ...pageInfo } = it;
          this.reviews = new BehaviorSubject(content);
          this.pageInfo = pageInfo;
          this.initPageNumbers(this.pageInfo.totalPages);
        } else {
          this.couldNotLoad = true;
        }
      });
  }

  getPage(page: number, size: number = 5) {
    this.router.navigateByUrl(
      `location/${this.location.value.id}/reviews?page=${page}`
    );
  }

  private initPageNumbers(n: number) {
    this.numbers = [];
    for (let i = 0; i < n; i++) {
      this.numbers.push(i);
    }
  }

  showPostForm() {
    this.showForm = true;
  }

  hidePostForm() {
    this.showForm = false;
  }

  onReviewPosted(review: Review) {
    console.log('event cauthg');
    this.showForm = false;
    const next = this.reviews.value;
    next.unshift(review);
    this.reviews.next(next);
  }

  onLoginClicked() {
    const redirectBackTo =
    `/location/${this.location.value.id}/reviews?page=${this.pageInfo.number}`;
    this.router.navigate(['/login'],
    { queryParams: { 'redirectBackTo': redirectBackTo} });
  }

  hideLoginOverlay() {
    document.getElementById('login-overlay').style.display = 'none';
  }

  showLoginOverlay() {
    document.getElementById('login-overlay').style.display = 'block';
  }

}
