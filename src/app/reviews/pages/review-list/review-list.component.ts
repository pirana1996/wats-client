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

  pageInfo: PageInfo;
  reviews: Review[];
  numbers: number[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit() {
    this.getPage(0);
  }

  getPage(page: number, size: number = 5) {
    this.reviewService.getReviewsByPage(page)
    .subscribe(it => {
      const { content, ...pageInfo } = it;
      this.reviews = content;
      this.pageInfo = pageInfo;
      this.initPageNumbers(this.pageInfo.totalPages);
    });
  }

  private initPageNumbers(n: number) {
    this.numbers = [];
    for (let i = 0; i < n; i++) {
      this.numbers.push(i);
    }
  }
}
