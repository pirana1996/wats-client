import { AuthService } from './../../../core/services/auth.service';
import { Answer } from './../../models/Answer';
import { LocationService } from './../../../core/services/location.service';
import { Location } from './../../../app/models/Location';
import { Component, Input, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageInfo } from '../../../app/models/page-info.model';
import { Question } from '../../models/Question';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../app/models/User';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {

  pageInfo: PageInfo;
  question: Question = null;
  answers = new BehaviorSubject<Answer[]>(null);
  location = new BehaviorSubject(null);
  activeUser: User = null;
  showForm = false;
  showNotLoggedIn = false;
  couldNotLoad = false;

  // tmp
  page: string;
  size: string;
  endPage: number;
  startPage: number;
  pagerNumbers: number[];

  constructor(
    private route: ActivatedRoute,
    public forumService: ForumService,
    private router: Router,
    private auth: AuthService,
    private locationService: LocationService
  ) {
    this.activeUser = this.auth.authStateSource.value;
    this.auth.authStateChangeEmitted$.subscribe(
      user => (this.activeUser = user)
    );
  }

  ngOnInit() {
    const locationId = this.route.snapshot.params['locationId'];
    this.locationService.getLocation(locationId).subscribe(it => {
      this.location.next(it);
    });
    const questionId = this.route.snapshot.params['questionId'];
    this.loadPage(questionId);
  }

  loadPage(questionId: number, page: number = 0, size: number = 30) {
    this.forumService.getQuestionById(questionId).subscribe(question => {
      this.question = question;
      this.forumService.getAnswersByQuestionId(1, this.question.id, page, size)
      .subscribe(it => {
        const { content, ...pageInfo } = it;
        this.answers.next(content);
        this.pageInfo = pageInfo;
      });
    });
  }

  showPostForm() {
    this.showForm = true;
  }

  hidePostForm() {
    this.showForm = false;
  }

  onAnswerPosted(comment: Answer) {
    this.showForm = false;
    const next = this.answers.value;
    next.unshift(comment);
    this.answers.next(next);
  }

  onLoginClicked() {
    const redirectBackTo = `/location/${
      this.location.value.id
    }/forum/questions/${this.question.id}/answers?page=${this.pageInfo.number}`;
    this.router.navigate(['/login'], {
      queryParams: { redirectBackTo: redirectBackTo }
    });
  }

  showNotLoggedInMessage() {
    this.showNotLoggedIn = true;
    window.scrollTo(0, 0);
  }

  // ngOnInit() {
  //   this.activatedRoute.paramMap.subscribe(params => {
  //     this.locationId = params.get('locationId');
  //     this.questionId = params.get('questionId');

  //     // Don't remove - singleton
  //     // this.question = this.forumService.getQuestionFromStorage(+this.questionId);
  //     this.activatedRoute.queryParamMap.subscribe(queryParam => {
  //       this.page = queryParam.get('page');
  //       this.size = queryParam.get('size');
  //       console.log('page: ' + this.page + ', size: ' + this.size);

  //       this.forumService
  //         .getCurrentQuestion(this.locationId, this.questionId)
  //         .subscribe(result => {
  //           this.question = result;
  //           this.forumService
  //             .getCurrentQuestionAnswers(
  //               this.locationId,
  //               this.questionId,
  //               this.page,
  //               this.size
  //             )
  //             .subscribe(res => {
  //               this.answers = res.content;
  //               this.pageInfo = res;

  //               this.pagerNumbers = this.getPager(+this.page);
  //             });
  //         });
  //     });
  //   });
  // }

  // arrayOne(n: number): any[] {
  //   return Array(n);
  // }

  // getPager(currentPage: number = 1) {
  //   if (this.pageInfo.totalPages <= 10) {
  //     // less then 10 pages show it all
  //     this.startPage = 1;
  //     this.endPage = this.pageInfo.totalPages;
  //   } else {
  //     if (currentPage <= 6) {
  //       this.startPage = 1;
  //       this.endPage = 10;
  //     } else if (currentPage + 4 >= this.pageInfo.totalPages) {
  //       this.startPage = this.pageInfo.totalPages - 9;
  //       this.endPage = this.pageInfo.totalPages;
  //     } else {
  //       this.startPage = currentPage - 5;
  //       this.endPage = currentPage + 4;
  //     }
  //   }
  //   const pages = Array.from(
  //     { length: this.endPage - this.startPage + 1 },
  //     (v, i) => i + this.startPage
  //   );
  //   console.log('current page: ', currentPage);
  //   console.log(pages);
  //   return pages;
  // }

  // setPage(page: number) {
  //   if (page >= 0 && page < this.pageInfo.totalPages) {
  //     this.page = '' + page;
  //     this.router.navigate(
  //       [
  //         '/location/' +
  //           this.location.value.id +
  //           '/forum/questions/' +
  //           this.question.id +
  //           '/answers'
  //       ],
  //       {
  //         queryParams: {
  //           page: page,
  //           size: 2
  //         }
  //       }
  //     );
  //   }
  // }
}
