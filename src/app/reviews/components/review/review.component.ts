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

  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
  }

  onShowCommentsClicked() {
    this.shouldHideComments = !this.shouldHideComments;
    this.reviewService.getTopMostPopularComments(this.review.id, 5)
      .subscribe(it => {
        this.review.comments = it;
      });
  }

}
