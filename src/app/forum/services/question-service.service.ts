import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Question} from "../models/Question";
import {PageInfo} from "../../app/models/page-info.model";

@Injectable()
export class ForumService {

  private apiUrl = `http://localhost:8080/api/locations`;

  questions: Question[];
  pageResult: PageInfo;

  constructor(public httpClient: HttpClient) { console.log("Tomce kur da jade");}

  getAllQuestions(locationId: number, questions: Question[]) {
    return this.httpClient.get<any>(`${this.apiUrl}/${locationId}/forum/questions`)
      .subscribe(result => {
        this.pageResult = result;
        this.questions = questions = result.content;
        console.log('size: ' + this.questions.length);
      });
  }

  getQuestionFromStorage(questionId: number): Question {
    console.log("question: ", questionId);
    console.log("list length: ", this.questions.length);
    return this.questions.find(value => value.id===questionId);
  }

  getCurrentQuestionAnswers(locationId: string, questionId: string) {
    return this.httpClient.get<any[]>(`${this.apiUrl}/${locationId}/forum/questions/${questionId}/answers`);
  }
}
