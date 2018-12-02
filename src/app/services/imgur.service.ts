import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Keys } from 'src/assets/keys';

export interface ResponseArray {
  data: any[];
  success: boolean;
  status: string;
}

export interface ResponseMeme {
  data: any;
  success: boolean;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImgurService {
  endpoint: string = 'https://api.imgur.com/3';
  private keys = new Keys;

  constructor(private http: HttpClient) { }

  // Retrieve all meme templates
  getTemplates(): Observable<ResponseArray> {
    return this.http.get<ResponseArray>(`${this.endpoint}/album/${this.keys.templateAlbumHash}/images`, {
      headers: { 'Authorization': `Client-ID ${this.keys.clientId}` }
    });
  }

  // Retrieve all memes
  getMemes(): Observable<ResponseArray> {
    return this.http.get<ResponseArray>(`${this.endpoint}/album/${this.keys.memeAlbumHash}/images`, {
      headers: { 'Authorization': `Client-ID ${this.keys.clientId}` }
    })
  }

  // Upload image to imgur
  uploadMeme(image: any): Observable<ResponseMeme> {
    const httpOptions = {
      headers: new HttpHeaders ({ 
        'Authorization': `Bearer ${this.keys.accessToken}`,
      })
    }
    const formData = new FormData();
    formData.append('image', image);
    formData.append('album', this.keys.memeAlbumHash);
    return this.http.post<ResponseMeme>(`${this.endpoint}/image`, formData, httpOptions);
  }
}
