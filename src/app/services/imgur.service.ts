import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  templateAlbumHash: string = 'cY45kfx';
  memeAlbumHash: string = '0hzHSAI';
  clientId: string = 'a3e0a22324ca1fa';
  clientSecret: string = 'c6abe70b0e994f2f06efc3de379f8da3558327c1';
  accessToken: string = '35e9b3ff3e017b88e8772b9af1af5624b1d1e91a';

  constructor(private http: HttpClient) { }

  // Retrieve all meme templates
  getTemplates(): Observable<ResponseArray> {
    return this.http.get<ResponseArray>(`${this.endpoint}/album/${this.templateAlbumHash}/images`, {
      headers: { 'Authorization': `Client-ID ${this.clientId}` }
    });
  }

  // Retrieve all memes
  getMemes(): Observable<ResponseArray> {
    return this.http.get<ResponseArray>(`${this.endpoint}/album/${this.memeAlbumHash}/images`, {
      headers: { 'Authorization': `Client-ID ${this.clientId}` }
    })
  }

  // Upload image to imgur
  uploadMeme(image: any): Observable<ResponseMeme> {
    const httpOptions = {
      headers: new HttpHeaders ({ 
        'Authorization': `Bearer ${this.accessToken}`,
      })
    }
    const formData = new FormData();
    formData.append('image', image);
    formData.append('album', this.memeAlbumHash);
    return this.http.post<ResponseMeme>(`${this.endpoint}/image`, formData, httpOptions);
  }
}
