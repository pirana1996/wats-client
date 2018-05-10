import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Question} from '../models/Question';
import {PageInfo} from '../../app/models/page-info.model';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Answer } from '../models/Answer';

@Injectable()
export class ForumService {

  // questions: Question[];
  // pageResult: PageInfo;

  constructor(public http: HttpClient) { console.log('Create instance of ForumService'); }

  getQuestionById(questionId: number) {
    return this.http.get<any>(`/api/public/locations/1/forum/questions/${questionId}`)
    .pipe(
      catchError(this.handleError('getQuestionById', null))
    );
  }

  public getQuestionsByLocationSoredByDateDesc(locationId: number, page: number = 0, size: number = 5): Observable<any> {
    return this.http.get<any>(`/api/public/locations/${locationId}/forum/questions?page=${page}&size=${size}&sort=datePublished,desc`)
      .pipe(
        catchError(this.handleError('getQuestionsByLocationSoredByDateDesc', null))
      );
  }

  getAnswersByQuestionId(locationId: number, questionId: number, page: number, size: number) {
    return this.http.get<any>(
      `/api/public/locations/${locationId}/forum/questions/${questionId}/answers?sort=id,asc&page=${page}&size=${size}`
    ).pipe(
      catchError(this.handleError('getAnswersByQuestionId', null))
    );
  }

  getTopCommentsForQuestion(locationId: number, questionId: number, quantity: number) {
    return this.http.get<any>(`/api/public/locations/${locationId}/forum/questions/${questionId}/answers/top?quantity=${quantity}`)
    .pipe(
      catchError(this.handleError('getTopCommentsForQuestion', null))
    );
  }

  public postQuestion(question: string, locationId: number)
  : Observable<Question> {
    return this.http.post<Question>(`/api/locations/${locationId}/forum/questions`, question)
    .pipe(
      catchError(this.handleError('postForumQuestion', null))
    );
  }

  public postAnswer(answer: string, questionId: number)
  : Observable<Answer> {
    return this.http.post<Answer>(`/api/locations/1/forum/questions/${questionId}/answers`, answer)
    .pipe(
      catchError(this.handleError('postAnswer', null))
    );
  }

  public likeForumAnswer(answerId: number)
  : Observable<boolean> {
    // TODO remote locationId
    // TODO remote questionId
    return this.http.post<boolean>(`/api/locations/1/forum/questions/1/answers/${answerId}/likes`, {})
      .pipe(
        catchError(this.handleError('likeForumANswer', null))
      );
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


  // After tweaking forum-service to singleton class this method will be used
  // getQuestionFromStorage(questionId: number): Question {
  //   console.log("question: ", questionId);
  //   console.log("list length: ", this.questions.length);
  //   return this.questions.find(value => value.id===questionId);
  // }
}
