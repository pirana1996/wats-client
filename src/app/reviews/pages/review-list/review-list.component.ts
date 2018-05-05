import { Component, OnInit } from '@angular/core';
import {ReviewService} from '../../services/review.service';
import {Review} from '../../models/review.model';
import {PageInfo} from '../../../app/models/page-info.model';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {

  pageResult: PageInfo;
  reviews: Review[];

  constructor(private reviewService: ReviewService) { }

  ngOnInit() {
    this.reviewService.getReviews()
      .subscribe(it => {
        this.pageResult = it;
        this.reviews = it.content;
      });
  }

}
