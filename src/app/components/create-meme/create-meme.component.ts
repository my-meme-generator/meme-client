import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { Meme } from '../../models/Meme';
import { MemeService } from '../../services/meme.service';

@Component({
  selector: 'app-create-meme',
  templateUrl: './create-meme.component.html',
  styleUrls: ['./create-meme.component.css']
})
export class CreateMemeComponent implements OnInit {
  public images: string[] = [];
  public mainImage: string = '';
  public dataURL;
  private ctx;
  private canvas;

  constructor(private memeService: MemeService) {
    
  }

  ngOnInit() {
    // Canvas setup
    this.canvas = <HTMLCanvasElement> document.getElementById('memeCanvas');
    this.ctx = this.canvas.getContext('2d');
  
    var deviceWidth = window.innerWidth;
    this.canvas.width = Math.min(600, deviceWidth-20);
    this.canvas.height = Math.min(480, deviceWidth-20);

    // Grab image files
    this.images.push('../../assets/images/meme_images/Ancient-Aliens.jpg');
    this.images.push('../../assets/images/meme_images/Disaster-Girl.jpg');
    this.images.push('../../assets/images/meme_images/Futurama-Fry.jpg');
    this.images.push('../../assets/images/meme_images/Mocking-Spongebob.jpg');
    this.mainImage = this.images[0];
  }

  ngAfterViewInit() {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    var img = <HTMLImageElement> document.getElementById('start-image');
    img.src = this.mainImage;
    
    img.onload = () => {
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    }
  }

  // Loads an image, can be used to reload image
  selectImage(image: string) {
    this.mainImage = image;
    var img = <HTMLImageElement> document.getElementById('start-image');
    img.src = image;
    
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
  }

  createMeme() {
    // Set text style
    this.ctx.lineWidth  = 5;
    this.ctx.font = '35pt impact';
    this.ctx.strokeStyle = 'black';
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'center';
    this.ctx.lineJoin = 'round';

    // Place upper text
    var upperText = (<HTMLInputElement> document.getElementById('upperText')).value.toUpperCase();
    var xUpper = this.canvas.width/2;
    var yUpper = 50;
    this.wrapText(upperText, xUpper, yUpper, this.canvas.width, 55, true);

    // Place lower text
    var lowerText = (<HTMLInputElement> document.getElementById('lowerText')).value.toUpperCase();
    var xLower = this.canvas.width/2;
    var yLower = this.canvas.height - 15;
    this.wrapText(lowerText, xLower, yLower, this.canvas.width, 55, false);

    this.dataURL = this.canvas.toDataURL();
    // add image to imgur album somehow

    /*var meme: Meme = {
      image: this.dataURL,
      author: (<HTMLInputElement> document.getElementById('author')).value,
      upvotes: 0,
      downvotes: 0,
      created: new Date()
    }

    this.memeService.createMeme(meme)
      .subscribe((meme) => {
        
      });
    */
  }

  // Code modified from https://www.html5canvastutorials.com/tutorials/html5-canvas-wrap-text-tutorial/.
  // Wraps text in canvas
  private wrapText(text, x, y, maxWidth, lineHeight, isUpper) {
    // split text words
    var words = text.split(' ');
    var line = '';
    var lineCount = 0;

    for(var n = 0; n < words.length; n++) {
      // get word and measure length 
      var testLine = line + words[n] + ' ';
      var metrics = this.ctx.measureText(testLine);
      var testWidth = metrics.width;
      // if word is too big
      if (testWidth > maxWidth && n > 0) {
        lineCount++;
        if(lineCount === 2) {
          //error message
          (<HTMLInputElement> document.getElementById('upperText')).value = '';
          (<HTMLInputElement> document.getElementById('lowerText')).value = '';
          (<HTMLInputElement> document.getElementById('author')).value = '';
          this.selectImage(this.mainImage);
          break;
        } else {
          // move overflowing line to next line
          if(isUpper) {
            this.ctx.strokeText(line, x, y);
            this.ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          // else move first line of lower text up
          } else {
            this.ctx.strokeText(line, x, y - lineHeight);
            this.ctx.fillText(line, x, y - lineHeight);
            line = words[n] + ' ';
          }
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
