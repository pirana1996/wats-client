import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Question} from '../models/Question';
import {PageInfo} from '../../app/models/page-info.model';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class ForumService {

  private apiUrl = `http://localhost:8080/api/locations`;

  questions: Question[];
  pageResult: PageInfo;

  constructor(public http: HttpClient) { console.log('Create instance of ForumService'); }

  // getAllQuestions(locationId: number, questions: Question[]) {
  //   return this.httpClient.get<any>(`${this.apiUrl}/${locationId}/forum/questions`)
  //     .subscribe(result => {
  //       this.pageResult = result;
  //       this.questions = questions = result.content;
  //       console.log('size: ' + this.questions.length);
  //     });
  // }

  public getQuestionsByLocationSoredByDateDesc(locationId: number, page: number = 0, size: number = 5): Observable<any> {
    return this.http.get<any>(`/api/public/locations/${locationId}/forum/questions?page=${page}&size=${size}&sort=datePublished,desc`)
      .pipe(
        catchError(this.handleError('getQuestionsByLocationSoredByDateDesc', null))
      );
  }

  public postForumQuestion(question: string, locationId: number)
  : Observable<Question> {
    return this.http.post<Question>(`/api/locations/${locationId}/forum/questions`, question)
    .pipe(
      catchError(this.handleError('postForumQuestion', null))
    );
  }

  // After tweaking forum-service to singleton class this method will be used
  // getQuestionFromStorage(questionId: number): Question {
  //   console.log("question: ", questionId);
  //   console.log("list length: ", this.questions.length);
  //   return this.questions.find(value => value.id===questionId);
  // }


  getCurrentQuestion(locationId: string, questionId: string) {
    return this.http.get<any>(`${this.apiUrl}/${locationId}/forum/questions/${questionId}`);
  }

  getCurrentQuestionAnswers(locationId: string, questionId: string, page: string, size: string) {
    // GET http://localhost:8080/api/locations/1/forum/questions/1/answers?sort=id,asc&page=0&size=2
    return this.http.get<any>(`${this.apiUrl}/${locationId}/forum/questions/${questionId}/answers?sort=id,asc&page=${page}&size=${size}`);
  }

  // createAnswer(locationId: string, questionId: string, answerText: string) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'Authorization': 'Bearer ' + this.token})
  //   };
  //   return this.httpClient.post(`${this.apiUrl}/${locationId}/forum/questions/${questionId}/answers`, answerText);
  // }

  getTopComments(locationId: number, questionId: number, quantity: number) {
    return this.http.get<any>(`${this.apiUrl}/${locationId}/forum/questions/${questionId}/answers/top?quantity=${quantity}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
