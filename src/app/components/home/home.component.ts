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
    this.memeService.getAllMemes()
      .subscribe((m: Meme[]) => {
        this.meme = m;
        console.log(this.meme);
      });
  }

}
