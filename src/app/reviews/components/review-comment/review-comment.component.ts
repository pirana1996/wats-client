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

  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
  }

  onLikeClicked() {
    console.log('like clicked');
    this.reviewService.likeReviewComment(this.comment.id).subscribe(it => {
      console.log('first like? ', it);
    });
  }

}
