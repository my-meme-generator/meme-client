import { Component, OnInit } from '@angular/core';
import { Meme } from '../../models/Meme';
import { MemeService } from '../../services/meme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public memes: Meme[] = [];
  //public testMeme: Meme = new Meme();

  constructor(private memeService: MemeService) { }

  ngOnInit() {
    /*this.testMeme._id = null;
    this.testMeme.imagePath = '../../assets/images/Ancient-Aliens.jpg';
    this.testMeme.textAbove = 'Top text';
    this.testMeme.textBelow = 'Bottom text';
    this.testMeme.author = 'Cole Phares';
    this.testMeme.upvotes = 2843;
    this.testMeme.downvotes = 89;
    this.testMeme.created = new Date;
    console.log(this.testMeme);
    
    this.memeService.createMeme(this.testMeme)
      .subscribe((m: Meme) => {
        console.log(m);
      })
    */
    this.memeService.getAllMemes()
      .subscribe((memeArray: Meme[]) => {
        for(var i = 0; i < memeArray.length; ++i) {
          var meme: Meme = {
            _id: memeArray[i]._id,
            imagePath: memeArray[i].imagePath,
            textAbove: memeArray[i].textAbove,
            textBelow: memeArray[i].textBelow,
            author: memeArray[i].author,
            upvotes: memeArray[i].upvotes,
            downvotes: memeArray[i].downvotes,
            created: memeArray[i].created
          }
          this.memes.push(meme);
          /*if(i == 0)
            this.addToUpvotes(meme);
          else if(i == 1)
            this.addToDownvotes(meme);
          */
        }
        console.log(this.memes);
      });
  }

  addToUpvotes(meme: Meme) {
    meme.upvotes++;
    this.memeService.updateMeme(meme)
      .subscribe((updated) => {
        console.log(updated);
      })
  }

  addToDownvotes(meme: Meme) {
    meme.downvotes++;
    this.memeService.updateMeme(meme)
      .subscribe((updated) => {
        console.log(updated);
      })
  }
}
