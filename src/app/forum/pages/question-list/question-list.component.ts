import { Component, OnInit } from '@angular/core';
import {Question} from "../../models/Question";
import {ForumService} from "../../services/forum-service.service";
import {PageInfo} from "../../../app/models/page-info.model";

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  // pageResult: PageInfo;
  questions: Question[];

  constructor(public forumService: ForumService) { }

  ngOnInit() {
    this.forumService.getAllQuestions(1, this.questions);
  }

}
