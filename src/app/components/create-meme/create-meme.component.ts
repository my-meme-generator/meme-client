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
    //grab image files
    this.images.push('../../assets/images/meme_images/Ancient-Aliens.jpg');
    this.images.push('../../assets/images/meme_images/Disaster-Girl.jpg');
    this.images.push('../../assets/images/meme_images/Futurama-Fry.jpg');
    this.images.push('../../assets/images/meme_images/Mocking-Spongebob.jpg');

    this.canvas = <HTMLCanvasElement> document.getElementById('memeCanvas');
    this.ctx = this.canvas.getContext('2d');
  
    var deviceWidth = window.innerWidth;
    var canvasWidth = Math.min(600, deviceWidth-20);
    var canvasHeight = Math.min(480, deviceWidth-20);
  
    this.canvas.width = canvasWidth;
    this.canvas.height = canvasHeight;

    this.selectImage(this.images[0]);
  }

  selectImage(image) {
    console.log("image: " + image);
    var img = <HTMLImageElement> document.getElementById('start-image');
    img.src = image;
    img.width = this.canvas.width;
    img.height = this.canvas.height;
    
    var sx = this.canvas.width/2 - img.width/2;
    var sy = this.canvas.height/2 - img.height/2;
  
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(img, sx, sy, img.width, img.height);
  }

  createMeme() {
    //this.ctx.fillText('');

    this.ctx.lineWidth  = 5;
    this.ctx.font = '35pt impact';
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.lineJoin = 'round';

    // Place upper text
    var upperText = (<HTMLInputElement> document.getElementById('upperText')).value;
    upperText = upperText.toUpperCase();
    var xUpper = this.canvas.width/2;
    var yUpper = 50;
    //this.ctx.strokeText(upperText, xUpper, yUpper);
    //this.ctx.fillText(upperText, xUpper, yUpper);
    this.wrapText(upperText, xUpper, yUpper, this.canvas.width, 55, true);

    var lowerText = (<HTMLInputElement> document.getElementById('lowerText')).value;
    lowerText = lowerText.toUpperCase();
    var xLower = this.canvas.width/2;
    var yLower = this.canvas.height - 15;
    //this.ctx.strokeText(lowerText, xLower, yLower);
    //this.ctx.fillText(lowerText, xLower, yLower);
    this.wrapText(lowerText, xLower, yLower, this.canvas.width, 55, false);
  }

  // Code from https://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/
  private wrapText(text, x, y, maxWidth, lineHeight, isUpper) {
    // split text words
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
      // get word and measure length 
      var testLine = line + words[n] + ' ';
      var metrics = this.ctx.measureText(testLine);
      var testWidth = metrics.width;
      // if word is too big
      if (testWidth > maxWidth && n > 0) {
        if(isUpper) {
          this.ctx.strokeText(line, x, y);
          this.ctx.fillText(line, x, y);
          line = words[n] + ' ';
          y += lineHeight;
        } else {
          this.ctx.strokeText(line, x, y - lineHeight);
          this.ctx.fillText(line, x, y - lineHeight);
          line = words[n] + ' ';
        }
      }
      else {
        line = testLine;
      }
    }
    this.ctx.strokeText(line, x, y);
    this.ctx.fillText(line, x, y);
  }

}
