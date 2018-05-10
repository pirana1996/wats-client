import { LocationService } from './../../../core/services/location.service';
import { Location } from './../../../app/models/Location';
import { Component, Input, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageInfo } from '../../../app/models/page-info.model';
import { Answer } from '../../models/Answer';
import { Question } from '../../models/Question';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {
  locationId: string;
  questionId: string;
  page: string;
  size: string;

  pageInfo: PageInfo;
  answers: Answer[];
  question: Question;
  pagerNumbers: number[];
  startPage: number;
  endPage: number;
  location = new BehaviorSubject(null);

  constructor(
    private activatedRoute: ActivatedRoute,
    public forumService: ForumService,
    private router: Router,
    private route: ActivatedRoute,
    private locationService: LocationService
  ) {
    const locationId = this.route.snapshot.params['locationId'];
    this.locationService.getLocation(locationId).subscribe(it => {
      this.location.next(it);
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.locationId = params.get('locationId');
      this.questionId = params.get('questionId');

      // Don't remove - singleton
      // this.question = this.forumService.getQuestionFromStorage(+this.questionId);
      this.activatedRoute.queryParamMap.subscribe(queryParam => {
        this.page = queryParam.get('page');
        this.size = queryParam.get('size');
        console.log('page: ' + this.page + ', size: ' + this.size);

        this.forumService
          .getCurrentQuestion(this.locationId, this.questionId)
          .subscribe(result => {
            this.question = result;
            this.forumService
              .getCurrentQuestionAnswers(
                this.locationId,
                this.questionId,
                this.page,
                this.size
              )
              .subscribe(res => {
                this.answers = res.content;
                this.pageInfo = res;

                this.pagerNumbers = this.getPager(+this.page);
              });
          });
      });
    });
  }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  getPager(currentPage: number = 1) {
    if (this.pageInfo.totalPages <= 10) {
      // less then 10 pages show it all
      this.startPage = 1;
      this.endPage = this.pageInfo.totalPages;
    } else {
      if (currentPage <= 6) {
        this.startPage = 1;
        this.endPage = 10;
      } else if (currentPage + 4 >= this.pageInfo.totalPages) {
        this.startPage = this.pageInfo.totalPages - 9;
        this.endPage = this.pageInfo.totalPages;
      } else {
        this.startPage = currentPage - 5;
        this.endPage = currentPage + 4;
      }
    }
    const pages = Array.from(
      { length: this.endPage - this.startPage + 1 },
      (v, i) => i + this.startPage
    );
    console.log('current page: ', currentPage);
    console.log(pages);
    return pages;
  }

  setPage(page: number) {
    if (page >= 0 && page < this.pageInfo.totalPages) {
      this.page = '' + page;
      this.router.navigate(
        [
          '/location/' +
            this.location.value.id +
            '/forum/questions/' +
            this.question.id +
            '/answers'
        ],
        {
          queryParams: {
            page: page,
            size: 2
          }
        }
      );
    }
  }
}
