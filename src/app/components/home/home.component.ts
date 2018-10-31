import { Component, OnInit } from '@angular/core';
import { Meme } from '../../models/Meme';
import { MemeService } from '../../services/meme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public meme: Meme[] = [];

  constructor(private memeService: MemeService) { }

  ngOnInit() {
    /*this.memeService.getAllMemes()
      .subscribe((m: Meme[]) => {
        this.meme = m;
        console.log(this.meme);
      });
    this.memeService.getAllMemeImages()
      .subscribe((images: String[]) => {
        console.log(images);
      })
    this.memeService.getMemeImage(1)
      .subscribe((image: String) => {
        console.log(image);
      })
    */
    var meme: Meme = {
      imagePath: 'lilly',
      text: 'some text',
      author: 'cole',
      upvotes: 2894,
      downvotes: 83
    }
    console.log('meme: ' + meme);
    this.memeService.createMeme(meme)
      .subscribe((m: Meme) => {
        console.log(m);
      })
  }
}
