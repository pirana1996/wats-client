import { Location } from './../../../app/models/Location';
import { Router } from '@angular/router';
import { ReviewService } from './../../services/review.service';
import { AuthService } from './../../../core/services/auth.service';
import { Review } from './../../models/review.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() review: Review;
  shouldHideComments = true;
  numLikes: number = null;

  constructor(
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnInit() {
    this.reviewService
      .getNumberOfReviewLikes(this.review.id)
      .subscribe(it => this.numLikes = it);
  }

  onShowTopCommentsClicked() {
    this.shouldHideComments = !this.shouldHideComments;
    if (!this.review.comments) {
      this.reviewService
      .getTopMostPopularComments(this.review.id, 4)
      .subscribe(it => {
        this.review.comments = it;
        console.log('fetched top comments from server');
      });
    }
  }

  onLikeClicked() {
    console.log('like clicked');
    this.reviewService.likeReview(this.review.id).subscribe(it => {
      this.numLikes += 1;
      console.log(it);
    });
  }

  onOpenFUllDiscussionClicked() {
    this.router.navigate(['/location/' + this.review.location.id + '/reviews/' + this.review.id]);
  }
}
