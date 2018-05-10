import { Router } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() review: Review;
  @Input() locationId: number;
  shouldHideComments = true;

  constructor(
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnInit() {
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
      console.log('first like? ', it);
    });
  }

  onOpenFullDiscussionClicked() {
    this.router.navigate(['/location/' + this.locationId + '/reviews/' + this.review.id]);
  }
}
