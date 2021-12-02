import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { mapData } from '../data.functions';

import { SongsMapped } from '../domain/interfaces';

@Injectable({ providedIn: 'root' })
export class SongService {
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];

  constructor(private http: HttpClient) {}

  fetchSongs(): Observable<SongsMapped> {
    return this.http
      .get<any>(`assets/data/songs.json`)
      .pipe(map((res) => mapData(res)));
  }
}
