import { Location } from './../../../app/models/Location';
import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Question} from '../../models/Question';
import {ForumService} from '../../services/forum-service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question: Question;
  @Input() location: Location;
  shouldHideComments = true;
  @Output() notLoggedin = new EventEmitter<any>();

  constructor(
    private forumService: ForumService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onOpenFullDiscussionClicked() {
    this.router.navigate(['/location/' + this.location.id + '/forum/questions/' + this.question.id + '/answers'], {
      queryParams: {
        page: 0,
        size: 2
      }
    });
  }

  onShowTopAnswersClicked() {
    this.shouldHideComments = !this.shouldHideComments;
    if (!this.question.answers) {
      this.forumService
      .getTopCommentsForQuestion(this.location.id, this.question.id, 3)
      .subscribe(it => {
        this.question.answers = it;
        console.log('fetched top answers from server');
      });
    }
  }

  emitNotLoggedIn() {
    this.notLoggedin.emit();
  }

}
