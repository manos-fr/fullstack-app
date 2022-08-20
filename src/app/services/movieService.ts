import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MovieService {
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];
  url = environment.url;

  constructor(private http: HttpClient) {}

  // fetchSongs(): Observable<SongsMapped> {
  //   return this.http
  //     .get<any>(`assets/data/songs.json`)
  //     .pipe(map((res) => mapData(res)));
  // }

  fetchMovies(): Observable<any> {
    return this.http.get<any>(`${this.url}/titles`);
  }
  fetchMovieId(req): Observable<any> {
    return this.http.get<any>(`${this.url}/titles/${req.id}`);
  }
  deleteMovieById(req): Observable<any> {
    return this.http.delete<any>(`${this.url}/titles/${req}`);
  }
  updateMovieById(req, body): Observable<any> {
    return this.http.put<any>(`${this.url}/titles/${req}`, body);
  }
  createMovie(body): Observable<any> {
    return this.http.post<any>(`${this.url}/titles`, body);
  }
}
