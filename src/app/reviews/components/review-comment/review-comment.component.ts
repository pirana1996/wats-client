import { ReviewService } from './../../services/review.service';
import { ReviewComment } from './../../models/review-comment.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-review-comment',
  templateUrl: './review-comment.component.html',
  styleUrls: ['./review-comment.component.css']
})
export class ReviewCommentComponent implements OnInit {

  @Input() comment: ReviewComment;
  @Output() notLoggedin = new EventEmitter<any>();

  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
  }

  onLikeClicked() {
    this.reviewService.likeReviewComment(this.comment.id).subscribe(liked => {
      if (liked === true) {
        this.comment.numLikes++;
      } else if (liked === false) {
        this.comment.numLikes--;
      } else if (liked === null) {
        this.notLoggedin.emit();
      }
    });
  }

}
