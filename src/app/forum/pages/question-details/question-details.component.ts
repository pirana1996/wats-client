import {Component, Input, OnInit} from '@angular/core';
import {ForumService} from "../../services/question-service.service";
import {ActivatedRoute} from "@angular/router";
import {PageInfo} from "../../../app/models/page-info.model";
import {Answer} from "../../models/Answer";
import {Question} from "../../models/Question";

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit {

  locationId: string;
  questionId: string;
  pageInfo: PageInfo;
  answers: Answer[];

  question: Question;

  constructor(private activatedRoute: ActivatedRoute,
              public forumService: ForumService) { }

  ngOnInit() {
    this.activatedRoute.paramMap
      .subscribe(params =>
        {
          this.locationId = params.get('locationId');
          this.questionId = params.get('questionId');

          this.question = this.forumService.getQuestionFromStorage(+this.questionId);
          // console.log("question: ", this.question.description);
          this.forumService.getCurrentQuestionAnswers(this.locationId, this.questionId)
            .subscribe(result => {
              this.answers = result;
              console.log(this.answers.length);
            });
        }
      );
    // GET http://localhost:8080/api/locations/{{q.location.id}}/forum/questions/{{q.id}}
  }

}
