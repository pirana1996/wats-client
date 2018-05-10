import { catchError } from 'rxjs/operators';
import { Location } from './../../app/models/Location';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocation(id: number): Observable<Location> {
    return this.http.get<Location>(`/api/public/locations/${id}`)
    .pipe(
      catchError(this.handleError('getLocation', null))
    );
  }

  findLocationsByNameLike(name: string): Observable<Location[]> {
    return this.http.get<Location[]>(`/api/public/locations?name=${name}`)
    .pipe(
      catchError(this.handleError('getLocationByNameLine', null))
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
