import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from "rxjs";
import {catchError} from 'rxjs/operators';
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CityService {

  private citiesUrl = environment.citiesUrl

  constructor(private http: HttpClient) {
  }

  searchCities(term: string): Observable<string[]> {
    if (!term.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return this.http.get<string[]>(`${this.citiesUrl}?term=${term}`).pipe(
      catchError(this.handleError<string[]>('searchCities', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }

}
