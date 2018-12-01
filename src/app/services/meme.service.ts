import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Meme } from '../models/Meme';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  constructor(private http: HttpClient) { }

  // Retrieve memes from server
  getAllMemes(): Observable<Meme[]> {
    return this.http.get<Meme[]>('http://localhost:8000/api/memes');
  }

  // Add a new meme to database
  createMeme(meme: Meme): Observable<Meme> {
    return this.http.post<Meme>('http://localhost:8000/api/memes', meme);
  }

  // Update meme (for upvotes/downvotes)
  updateMeme(meme: Meme): Observable<any> {
    return this.http.put<any>('http://localhost:8000/api/votes/' + meme._id, meme);
  }
}
