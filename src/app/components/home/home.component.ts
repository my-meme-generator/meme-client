import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Meme } from '../../models/Meme';
import { MemeService } from '../../services/meme.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public memes: Meme[] = [];

  constructor(private memeService: MemeService) { }

  ngOnInit() {
    var meme: Meme = {
      _id: null,
      //imagePath: './assets/images/Ancient-Aliens.jpg',
      imagePath: 'https://imgflip.com/s/meme/Ancient-Aliens.jpg'
      textAbove: 'Mom got a haircut',
      textBelow: 'Aliens',
      author: 'zedzorander',
      upvotes: 829,
      downvotes: 21,
      created: new Date()
    }

    this.memeService.createMeme(meme)
      .subscribe((newMeme) => {
        this.memes.push(newMeme);
      })

    // Get memes from server
    /*this.memeService.getAllMemes()
      .subscribe((memeArray: Meme[]) => {
        // Array sorted by most recently created is returned
        this.memes = memeArray.reverse();
        // DELETE THESE BEFORE DEPLOYMENT
        console.log(this.memes);
      });*/
  }

  // Increase upvote for meme
  addToUpvotes(meme: Meme) {
    meme.upvotes++;
    this.memeService.updateMeme(meme)
      .subscribe((updated) => {
        console.log(updated);
      })
  }

  // Increase downvote for meme
  addToDownvotes(meme: Meme) {
    meme.downvotes++;
    this.memeService.updateMeme(meme)
      .subscribe((updated) => {
        console.log(updated);
      })
  }

  switchToUpvote() {
    this.memes = this.memes.sort((a, b) => {
      return a.upvotes - b.upvotes;
    })
  }

  switchToRecent() {
    this.memes = this.memes.sort((a, b) => {
      return +new Date(a.created) - +new Date(b.created);
    })
  }
}
