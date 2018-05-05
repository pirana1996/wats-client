import { ReviewService } from './../../services/review.service';
import { Review } from './../../models/review.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    // this.http.get<any>('/api/public/locations/1/reviews')
    // .subscribe(it => console.log('EVE GO ', it));


    this.reviewService.getReviews()
      .subscribe(it => {
        console.log('OVA E ', it);
        this.pageResult = it;
        this.reviews = it.content;
      });
  }

}
