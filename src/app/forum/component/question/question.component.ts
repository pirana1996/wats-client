import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../models/Question";
import {ForumService} from "../../services/forum-service.service";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input()
  question: Question;
  shouldHideComments = true;

  constructor(private forumService: ForumService, private router: Router) { }

  ngOnInit() {
  }

  onShowCommentsClicked() {
    this.shouldHideComments = !this.shouldHideComments;
    this.forumService.getTopComments(this.question.location.id, this.question.id, 3)
      .subscribe(it => {
        this.question.answers = it;
      });
  }

  openFullDiscussion() {
    this.router.navigate(['/location/' + this.question.location.id + '/forum/questions/' + this.question.id + '/answers'], {
      queryParams: {
        page: 0,
        size: 2
      }
    });
  }

}
