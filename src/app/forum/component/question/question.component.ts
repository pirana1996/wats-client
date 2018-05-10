import { Location } from './../../../app/models/Location';
import {Component, Input, OnInit} from '@angular/core';
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

  constructor(private forumService: ForumService, private router: Router) { }

  ngOnInit() {
  }

  onShowCommentsClicked() {
    this.shouldHideComments = !this.shouldHideComments;
    this.forumService.getTopComments(this.location.id, this.question.id, 3)
      .subscribe(it => {
        this.question.answers = it;
      });
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
      .getTopComments(this.location.id, this.question.id, 3)
      .subscribe(it => {
        this.question.answers = it;
        console.log('fetched top answers from server');
      });
    }
  }

}
