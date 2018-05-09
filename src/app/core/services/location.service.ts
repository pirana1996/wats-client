import { Location } from './../../app/models/Location';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LocationService {

  constructor(private http: HttpClient) { }

  getLocation(id: number): Observable<Location> {
    return this.http.get<Location>(`/api/public/locations/${id}`);
  }
}
