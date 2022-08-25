import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as helpers from 'src/app/data.functions';
import { NewTitle, TitlesMapped } from '../domain/interfaces';

@Injectable({ providedIn: 'root' })
export class MovieService {
  url = environment.url;

  constructor(private http: HttpClient) {}

  fetchMovies(): Observable<TitlesMapped> {
    return this.http
      .get<any>(`${this.url}/titles`)
      .pipe(map((res) => helpers.mapTitles(res)));
  }
  fetchMovieId(req): Observable<TitlesMapped> {
    return this.http
      .get<any>(`${this.url}/titles/${req.id}`)
      .pipe(map((res) => helpers.mapTitles(res)));
  }
  deleteMovieById(req): Observable<any> {
    return this.http.delete<any>(`${this.url}/titles/${req}`);
  }
  updateMovieById(req, body): Observable<any> {
    return this.http
      .put<any>(`${this.url}/titles/${req}`, body)
      .pipe(map((res) => helpers.mapTitles(res)));
  }
  createMovie(body: NewTitle): Observable<any> {
    return this.http
      .post<any>(`${this.url}/titles`, body)
      .pipe(map((res) => helpers.mapTitles(res)));
  }
}
