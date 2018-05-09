import { ReviewComment } from './../../models/review-comment.model';
import { AuthService } from './../../../core/services/auth.service';
import { ReviewService } from './../../services/review.service';
import { Review } from './../../models/review.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../app/models/User';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject } from 'rxjs';
import { LocationService } from '../../../core/services/location.service';
import { PageInfo } from '../../../app/models/page-info.model';

@Component({
  selector: 'app-review-discussion',
  templateUrl: './review-discussion.component.html',
  styleUrls: ['./review-discussion.component.css']
})
export class ReviewDiscussionComponent implements OnInit {
  pageInfo: PageInfo;
  activeUser: User = null;
  review: Review = null;
  comments = new BehaviorSubject<ReviewComment[]>(null);
  showForm = false;
  location = new BehaviorSubject(null);

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private locationService: LocationService
  ) {
    this.activeUser = this.auth.authStateSource.value;
    this.auth.authStateChangeEmitted$.subscribe(
      user => (this.activeUser = user)
    );
  }

  ngOnInit() {
    const locationId = this.route.snapshot.params['locationId'];
    this.locationService.getLocation(locationId).subscribe(it => {
      this.location.next(it);
    });
    const reviewId = this.route.snapshot.params['id'];
    this.loadPage(reviewId);
  }

  loadPage(reviewId: number, page: number = 0, size: number = 30) {
    this.reviewService.getReviewById(reviewId).subscribe(review => {
      this.review = review;
      this.reviewService.getCommentsforReviewOrderByDateDesc(this.review.id).subscribe(it => {
        const { content, ...pageInfo } = it;
        this.comments.next(content);
        this.pageInfo = pageInfo;
      });
    });
  }

  showPostForm() {
    this.showForm = true;
  }

  hidePostForm() {
    this.showForm = false;
  }

  onReviewCommentPosted(comment: ReviewComment) {
    console.log('event cauthg');
    this.showForm = false;
    const next = this.comments.value;
    next.unshift(comment);
    this.comments.next(next);
  }
}
