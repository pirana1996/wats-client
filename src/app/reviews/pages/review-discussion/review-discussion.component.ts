import { ReviewService } from './../../services/review.service';
import { Review } from './../../models/review.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-discussion',
  templateUrl: './review-discussion.component.html',
  styleUrls: ['./review-discussion.component.css']
})
export class ReviewDiscussionComponent implements OnInit {

  review: Review;

  constructor(
    private reviewService: ReviewService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const reviewId = this.route.snapshot.params['id'];
    console.log(reviewId);
    this.loadPage(reviewId);
  }

  async loadPage(reviewId: number) {
    await this.reviewService.getReviewById(reviewId).subscribe(it => this.review = it);
    await this.reviewService.getAllCommentsforReview(reviewId).subscribe(it => {this.review.comments = it; console.log(it); });
  }

}
