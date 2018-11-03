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
    /*var meme: Meme = {
      imagePath: 'lilly',
      text: 'some text',
      author: 'cole',
      upvotes: 2894,
      downvotes: 83
    }
    
    this.memeService.createMeme(meme)
      .subscribe((m: Meme) => {
        console.log(m);
      })
    */
    /*var meme: Meme = {
      imagePath: 'somewhere',
      text: 'some text',
      author: 'cole',
      upvotes: 24,
      downvotes: 83
    }
  
    this.memeService.createMeme(meme)
      .subscribe((m: Meme) => {
        console.log(m);
      })*/
  
    this.memeService.getAllMemes()
    .subscribe((memeArray) => {
      console.log('typeof(memeArray): ' + typeof(memeArray));
      for(var m in memeArray) {
        console.log('m: ' + memeArray[m]);
        this.meme.push(memeArray[m]);
      }
      console.log('meme[]: ' + this.meme);
      
    });
  }
}
