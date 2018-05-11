import { ReviewComment } from './../../models/review-comment.model';
import { AuthService } from './../../../core/services/auth.service';
import { ReviewService } from './../../services/review.service';
import { Review } from './../../models/review.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  review: Review = null;
  comments = new BehaviorSubject<ReviewComment[]>(null);
  activeUser: User = null;
  location = new BehaviorSubject(null);
  showForm = false;
  showNotLoggedIn = false;
  couldNotLoad = false;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private locationService: LocationService,
    private router: Router
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
      this.reviewService
        .getCommentsForReviewOrderByDateDesc(this.review.id)
        .subscribe(it => {
          if (it) {
            const { content, ...pageInfo } = it;
            this.comments.next(content);
            this.pageInfo = pageInfo;
          } else {
            this.couldNotLoad = true;
          }
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
    this.showForm = false;
    const next = this.comments.value;
    next.unshift(comment);
    this.comments.next(next);
  }

  onLoginClicked() {
    const redirectBackTo = `/location/${this.location.value.id}/reviews/${
      this.review.id
    }/?page=${this.pageInfo.number}`;
    this.router.navigate(['/login'], {
      queryParams: { redirectBackTo: redirectBackTo }
    });
  }

  hideLoginOverlay() {
    document.getElementById('login-overlay').style.display = 'none';
  }

  showLoginOverlay() {
    document.getElementById('login-overlay').style.display = 'block';
  }
}
