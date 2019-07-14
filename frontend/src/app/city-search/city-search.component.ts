import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {CityService} from "../city.service";

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css']
})
export class CitySearchComponent implements OnInit {

  constructor(private cityService: CityService) {
  }

  @Input() title: string
  @Output() selected = new EventEmitter<string>();

  /* Implement search box for cities */

  cities$: Observable<string[]>;
  private searchTerms = new Subject<string>();
  showSuggestions = true;

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.cities$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.cityService.searchCities(term)),
    );
  }

  /* Define behavior on click */

  selectedCity = '';

  onClick(value: string) {
    this.selectedCity = value;
    this.showSuggestions = false;
    this.selected.emit(this.selectedCity);
  }

  onFocus(value) {
    this.showSuggestions = true;
  }

  /* Define behavior on enter */

  onEnter(searchTerm: string) {
    this.cityService.searchCities(searchTerm).subscribe(cities => {
      if (cities.length == 1) {
        this.selectedCity = cities[0];
        this.showSuggestions = false;
        this.selected.emit(this.selectedCity);
      }
    })
  }

  onBackspace(value) {
    this.showSuggestions = true;
  }
}
