import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Meme } from '../models/Meme';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  constructor(private http: HttpClient) { }

  getAllMemes(): Observable<Meme[]> {
    return this.http.get<Meme[]>('http://localhost:8000/api/memes');
  }

  createMeme(meme: Meme): Observable<Meme> {
    return this.http.post<Meme>('http://localhost:8000/api/meme', meme);
  }

  /*updateMeme(meme: Meme): Observable<Meme> {
    return this.http.put<Meme>('http://localhost:8000/' + meme._id, meme);
  }*/
}
