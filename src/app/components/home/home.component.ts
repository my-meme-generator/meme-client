import { Component, OnInit } from '@angular/core';
import { Meme } from '../../models/Meme';
import { MemeService } from '../../services/meme.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public memes: Meme[] = [];

  // LOOK UP INPUT TYPE FILE FOR ACCEPTING IMAGE FILES
  
  constructor(private memeService: MemeService,
              private dataService: DataService) { }

  ngOnInit() {
    this.dataService.currentMemes
      .subscribe(memes => {
        this.memes = memes;
      })
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
    }).reverse();
  }

  // Sort array by most recent
  switchToRecent() {;
    this.memes = this.memes.sort((a, b) => {
      return +new Date(b.created) - +new Date(a.created);
    })
  }

}
