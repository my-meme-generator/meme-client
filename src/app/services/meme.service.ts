import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Meme } from '../models/Meme';

@Injectable({
  providedIn: 'root'
})
export class MemeService {
  memes: Meme[] = [];

  constructor(private http: HttpClient) { }

  getAllMemes(): Observable<Meme[]> {
    return this.http.get<Meme[]>('http://localhost:8000/api/memes');
  }

  createMeme(meme: Meme): Observable<Meme> {
    return this.http.post<Meme>('http://localhost:8000/api/meme', meme);
  }

  updateMeme(meme: Meme): Observable<any> {
    return this.http.put<any>('http://localhost:8000/api/votes/' + meme._id, meme);
  }
}
