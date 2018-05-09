import { ReviewService } from './../../services/review.service';
import { ReviewComment } from './../../models/review-comment.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-review-comment',
  templateUrl: './review-comment.component.html',
  styleUrls: ['./review-comment.component.css']
})
export class ReviewCommentComponent implements OnInit {

  @Input()
  comment: ReviewComment;
  numLikes: number = null;

  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
    this.reviewService
    .getNumberOfReviewCommentLikes(this.comment.id)
    .subscribe(it => {this.numLikes = it;  });
  }

}
