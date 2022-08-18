import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MovieService {
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  constructor(private http: HttpClient) {}

  // fetchSongs(): Observable<SongsMapped> {
  //   return this.http
  //     .get<any>(`assets/data/songs.json`)
  //     .pipe(map((res) => mapData(res)));
  // }

  fetchMovies(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/titles`);
  }
  fetchMovieId(req): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/titles/${req.id}`);
  }
  deleteMovieById(req): Observable<any> {
    return this.http.delete<any>(`http://localhost:3000/titles/${req}`);
  }
  updateMovieById(req, body): Observable<any> {
    return this.http.put<any>(`http://localhost:3000/titles/${req}`, body);
  }
  createMovie(body): Observable<any> {
    return this.http.post<any>(`http://localhost:3000/titles`, body);
  }
}
