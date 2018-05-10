import { Question } from './../../models/Question';
import { Component, OnInit } from '@angular/core';
import {ForumService} from '../../services/forum-service.service';
import {PageInfo} from '../../../app/models/page-info.model';
// tslint:disable-next-line:import-blacklist
import { BehaviorSubject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LocationService } from '../../../core/services/location.service';
import { User } from '../../../app/models/User';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  pageInfo: PageInfo;
  showForm = false;
  activeUser: User = null;
  questions: BehaviorSubject<Question[]> = new BehaviorSubject(null);
  location = new BehaviorSubject(null);

  constructor(
    public forumService: ForumService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService
  ) {
    this.activeUser = this.auth.authStateSource.value;
    this.auth.authStateChangeEmitted$.subscribe(
      user => (this.activeUser = user)
    );
  }

  ngOnInit() {
    const locationId = this.route.snapshot.params['locationId'];
    this.locationService.getLocation(locationId).subscribe(location => {
      this.location.next(location);
      let page = this.route.snapshot.params['page'];
      if (!page) {
        page = 0;
      }
      this.forumService.getQuestionsByLocationSoredByDateDesc(location.id, page)
      .subscribe(it => {
        const { content, ...pageInfo } = it;
        this.questions = new BehaviorSubject(content);
        this.pageInfo = pageInfo;
        // this.initPageNumbers(this.pageInfo.totalPages);)
      });
    });
  }

  showPostForm() {
    this.showForm = true;
  }

  hidePostForm() {
    this.showForm = false;
  }

  onQuestionPosted(q: Question) {
    this.showForm = false;
    const next = this.questions.value;
    next.unshift(q);
    this.questions.next(next);
  }
}
