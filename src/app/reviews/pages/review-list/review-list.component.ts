import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthService } from './../../../core/services/auth.service';
import { ReviewService } from './../../services/review.service';
import { Review } from './../../models/review.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {PageInfo} from '../../../app/models/page-info.model';
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

  constructor(
    private reviewService: ReviewService,
    private auth: AuthService
  ) {
    this.activeUser = this.auth.authStateSource.value;
    this.auth.authStateChangeEmitted$.subscribe(user => this.activeUser = user);
  }

  ngOnInit() {
    this.getPage(0);
  }

  getPage(page: number, size: number = 5) {
    this.reviewService.getReviewsByLocationSoredByDateDesc(1, page)
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
