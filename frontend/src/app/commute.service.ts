import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {catchError} from 'rxjs/operators';
import {environment} from "../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CommuteService {

  private recommenderUrl = environment.recommenderUrl;

  constructor(private http: HttpClient) {
  }


  getHomeRecommendation(work1: string, work2: string): Observable<string> {
    let homeRecommendationUrl = `${this.recommenderUrl}/commute/${work1}/${work2}`;
    return this.http.get<string>(homeRecommendationUrl).pipe(
      catchError(this.handleError<string>('getHomeRecommendation', ''))
    );
  }


  getMapUrl(origin: string, destination: string): Observable<string> {
    let mapUrl = `${this.recommenderUrl}/maps/${origin}/${destination}`;
    return this.http.get<string>(mapUrl).pipe(
      catchError(this.handleError<string>('getMapUrl', ''))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
