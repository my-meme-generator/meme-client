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

  // LOOK UP INPUT TYPE FILE FOR ACCEPTING IMAGE FILES
  
  constructor(private memeService: MemeService) { }

  ngOnInit() {

    // Get memes from server
    this.memeService.getAllMemes()
      .subscribe((memeArray: Meme[]) => {
        // Array sorted by most recently created is returned
        this.memes = memeArray.reverse();
      });
      
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

  // Sort array by upvotes
  switchToUpvote() {
    this.memes = this.memes.sort((a, b) => {
      return a.upvotes - b.upvotes;
    })
  }

  // Sort array by most recent
  switchToRecent() {
    this.memes = this.memes.sort((a, b) => {
      return +new Date(a.created) - +new Date(b.created);
    })
  }

}
