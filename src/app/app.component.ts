import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { Meme } from './models/Meme';
import { MemeService } from './services/meme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'meme-client';
  memes: Meme[] = [];

  constructor(private memeService: MemeService, 
              private dataService: DataService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.dataService.currentMemes
      .subscribe(memes => {
        this.memes = memes;
      })

    // Get memes from server
    this.memeService.getAllMemes()
      .subscribe((memeArray: Meme[]) => {
        // Array sorted by most recently created is returned
        this.memes = memeArray.reverse();
        this.dataService.updateMemes(this.memes);
      });
  }
}
