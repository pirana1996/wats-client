import { ReviewComment } from './../models/review-comment.model';
import { Review } from './../models/review.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ReviewService {

  constructor(private http: HttpClient) { }

  public getReviews(): Observable<any> {
    return this.http.get<any>('/api/public/locations/1/reviews')
      .pipe(
        catchError(this.handleError('getReviews', null))
      );
  }

  public getReviewById(id: number): Observable<Review> {
    return this.http.get<Review>(`/api/public/locations/1/reviews/${id}`)
      .pipe(
        catchError(this.handleError('getReviewById', null))
      );
  }

  public getReviewsByLocationSoredByDateDesc(locationId: number, page: number = 0, size: number = 5): Observable<any> {
    return this.http.get<any>(`/api/public/locations/${locationId}/reviews?page=${page}&size=${size}&sort=datePublished,desc`)
      .pipe(
        catchError(this.handleError('getReviewsByPage', null))
      );
  }

  public getReviewsByLocationSoredByPopularity(locationId: number, page: number = 0, size: number = 5): Observable<any> {
    throw new Error('Method not implemented');
  }

  public getTopMostPopularComments(reviewId: number, top: number): Observable<any> {
    return this.http.get<any>(`/api/public/locations/1/reviews/${reviewId}/comments?size=${top}`)
      .pipe(
        catchError(this.handleError('getTopMostPopularComments', null))
      );
  }

  public postReview(reviewRequest: {description: string, locationId: number, datePublished: Date})
  : Observable<Review> {
    return this.http.post<Review>(`/api/locations/${reviewRequest.locationId}/reviews/`, reviewRequest)
    .pipe(
      catchError(this.handleError('postReview', null))
    );
  }

  public getAllCommentsforReview(reviewId: number): Observable<ReviewComment[]> {
    return this.http.get<any>(`/api/public/locations/1/reviews/${reviewId}/comments`)
      .pipe(
        catchError(this.handleError('getAllCommentsforReview', null))
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

}
