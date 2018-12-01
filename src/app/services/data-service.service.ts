import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Meme } from '../models/Meme';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private memeSource: BehaviorSubject<Meme[]> = new BehaviorSubject<Meme[]>(null);
  currentMemes = this.memeSource.asObservable();

  constructor() {}

  updateMemes(memes: Meme[]) {
    this.memeSource.next(memes);
  }
}
