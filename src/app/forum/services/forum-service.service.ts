import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Question} from "../models/Question";
import {PageInfo} from "../../app/models/page-info.model";

@Injectable()
export class ForumService {

  private apiUrl = `http://localhost:8080/api/locations`;

  questions: Question[];
  pageResult: PageInfo;

  constructor(public httpClient: HttpClient) { console.log("Create instance of ForumService");}

  getAllQuestions(locationId: number, questions: Question[]) {
    return this.httpClient.get<any>(`${this.apiUrl}/${locationId}/forum/questions`)
      .subscribe(result => {
        this.pageResult = result;
        this.questions = questions = result.content;
        console.log('size: ' + this.questions.length);
      });
  }

  // After tweaking forum-service to singleton class this method will be used
  // getQuestionFromStorage(questionId: number): Question {
  //   console.log("question: ", questionId);
  //   console.log("list length: ", this.questions.length);
  //   return this.questions.find(value => value.id===questionId);
  // }


  getCurrentQuestion(locationId: string, questionId: string) {
    return this.httpClient.get<any>(`${this.apiUrl}/${locationId}/forum/questions/${questionId}`);
  }

  getCurrentQuestionAnswers(locationId: string, questionId: string, page: string, size: string) {
    // GET http://localhost:8080/api/locations/1/forum/questions/1/answers?sort=id,asc&page=0&size=2
    return this.httpClient.get<any>(`${this.apiUrl}/${locationId}/forum/questions/${questionId}/answers?sort=id,asc&page=${page}&size=${size}`);
  }

  // createAnswer(locationId: string, questionId: string, answerText: string) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'Authorization': 'Bearer ' + this.token})
  //   };
  //   return this.httpClient.post(`${this.apiUrl}/${locationId}/forum/questions/${questionId}/answers`, answerText);
  // }
}
