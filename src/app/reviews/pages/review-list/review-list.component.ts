import { LocationService } from './../../../core/services/location.service';
import { ActivatedRoute, Router, ActivationEnd, NavigationStart } from '@angular/router';
import { Location } from './../../../app/models/Location';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from './../../../core/services/auth.service';
import { ReviewService } from './../../services/review.service';
import { Review } from './../../models/review.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageInfo } from '../../../app/models/page-info.model';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { User } from '../../../app/models/User';

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
  location = new BehaviorSubject(null);

  constructor(
    private reviewService: ReviewService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
  ) {
    this.activeUser = this.auth.authStateSource.value;
    this.auth.authStateChangeEmitted$.subscribe(
      user => (this.activeUser = user)
    );
    router.events
    .filter(event => event instanceof NavigationStart)
    .subscribe((event: NavigationStart) => {
      const re = /.*(?:\D|^)(\d+)/; // extract only the last number from url (...?page=12)
      const page = +re.exec(event.url)[1];
      this.getReviewsOrderByDateDescPaged(page);
    });
  }

  ngOnInit() {
    const locationId = this.route.snapshot.params['locationId'];
    this.locationService.getLocation(locationId).subscribe(it => {
      this.location.next(it);
      let page = this.route.snapshot.params['page'];
      if (!page) {
        page = 0;
      }
      this.getReviewsOrderByDateDescPaged(page);
    });
  }

  getPage(page: number, size: number = 5) {
    this.router.navigateByUrl(
      `location/${this.location.value.id}/reviews?page=${page}`
    );
  }

  private getReviewsOrderByDateDescPaged(page: number) {
    this.reviewService
      .getReviewsByLocationSoredByDateDesc(1, page)
      .subscribe(it => {
        const { content, ...pageInfo } = it;
        this.reviews = new BehaviorSubject(content);
        this.pageInfo = pageInfo;
        this.initPageNumbers(this.pageInfo.totalPages);
      });
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
}
