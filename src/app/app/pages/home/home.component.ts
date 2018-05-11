import { Location } from './../../models/Location';
import { LocationService } from './../../../core/services/location.service';
import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  locations: Location[] = []; // [new Location(1, 'Skoddddddddddpje'), new Location(2, 'Veles') ];
  selectedLocation: Location = null;
  private query = new Subject<string>();
  fetchError = false;

  constructor(
    private locationService: LocationService,
  ) { }

  ngOnInit() {
    this.query.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(400),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
    ).subscribe(query => {
      this.findLocationsForName(query);
    });
  }

  findLocationsForName(name: string) {
    this.locationService.findLocationsByNameLike(name).subscribe(locations => {
      this.fetchError = !locations ? true : false;
      if (!this.fetchError) {
        this.locations = locations;
        document.getElementById('search-result-box').style.display = 'block';
      }
    });
  }

  search(updatedQuery: string): void {
    if (updatedQuery) {
      this.query.next(updatedQuery);
    } else {
      this.locations = [];
    }
  }

  onSelectLocation(location: Location) {
    this.selectedLocation = location;
    document.getElementById('search-result-box').style.display = 'none';
  }

}
