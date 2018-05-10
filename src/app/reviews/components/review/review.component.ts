import { Location } from './../../../app/models/Location';
import { AuthService } from './../../../core/services/auth.service';
import { Router } from '@angular/router';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../../app/models/User';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() review: Review;
  @Input() location: Location;
  shouldHideComments = true;
  @Output() notLoggedin = new EventEmitter<any>();

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
    this.reviewService.likeReview(this.review.id).subscribe(liked => {
      if (liked === true) {
        this.review.numLikes++;
      } else if (liked === false) {
        this.review.numLikes--;
      } else if (liked === null) {
        this.emitNotLoggedIn();
      }
    });
  }

  emitNotLoggedIn() {
    this.notLoggedin.emit();
  }

  onOpenFullDiscussionClicked() {
    this.router.navigate(['/location/' + this.location.id + '/reviews/' + this.review.id]);
  }
}
