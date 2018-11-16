import { Component, OnInit } from '@angular/core';
import { Meme } from '../../models/Meme';
import { MemeService } from '../../services/meme.service';

@Component({
  selector: 'app-create-meme',
  templateUrl: './create-meme.component.html',
  styleUrls: ['./create-meme.component.css']
})
export class CreateMemeComponent implements OnInit {
  public images: string[] = [];
  public image: string = '';
  private ctx;
  private canvas;

  constructor(private memeService: MemeService) { }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement> document.getElementById('memeCanvas');
    this.ctx = this.canvas.getContext('2d');
  
    var deviceWidth = window.innerWidth;
    var canvasWidth = Math.min(600, deviceWidth-20);
    var canvasHeight = Math.min(480, deviceWidth-20);
  
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;

    //grab image files
    this.images.push('../../assets/images/meme_images/Ancient-Aliens.jpg');
    this.images.push('../../assets/images/meme_images/Disaster-Girl.jpg');
    this.images.push('../../assets/images/meme_images/Futurama-Fry.jpg');
    this.images.push('../../assets/images/meme_images/Mocking-Spongebob.jpg');
  }

  selectImage(image) {
    this.image = image;
    var img = <HTMLImageElement> document.getElementById('start-image');
    img.src = this.image;
    img.width = 500;
    img.height = 500;
    
    var sx = this.canvas.width/2 - img.width/2;
    var sy = this.canvas.height/2 - img.height/2;
  
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(img, sx, sy, img.width, img.height);
  }

}
