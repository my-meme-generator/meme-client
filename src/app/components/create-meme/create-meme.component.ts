import { Component, OnInit } from '@angular/core';
import { Meme } from '../../models/Meme';
import { MemeService } from '../../services/meme.service';
import { ImgurService, ResponseArray, ResponseMeme } from '../../services/imgur.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-create-meme',
  templateUrl: './create-meme.component.html',
  styleUrls: ['./create-meme.component.css']
})
export class CreateMemeComponent implements OnInit {
  private memes: Meme[];
  public data: any[] = [];
  public images: any[] = [];
  public mainImage: string = '';
  private ctx;
  private canvas;

  constructor(private memeService: MemeService,
              private imgurService: ImgurService,
              private router: Router,
              private dataService: DataService) {}

  ngOnInit() {
    this.dataService.currentMemes
      .subscribe(memes => {
        this.memes = memes;
      })
    
    // Canvas setup
    this.canvas = <HTMLCanvasElement> document.getElementById('memeCanvas');
    this.ctx = this.canvas.getContext('2d');
  
    // Set up canvas dimensions
    var deviceWidth = window.innerWidth;
    this.canvas.width = Math.min(600, deviceWidth-20);
    this.canvas.height = Math.min(480, deviceWidth-20);

    // Grab the image templates off imgur
    this.imgurService.getTemplates()
      .subscribe((response: ResponseArray) => {
        this.data = response.data;
        for(var i = 0; i < this.data.length; ++i) {
          this.images.push(this.data[i].link);
        }
        this.mainImage = this.images[0];
      })
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

    // Save image with text written on it
    var imageArray = this.canvas.toDataURL('image/jpeg').split(',');

    // add image to imgur album 
    this.imgurService.uploadMeme(imageArray[1])
      .subscribe((imageResponse: ResponseMeme) => {
        var newMeme: Meme = {
          imageLink: imageResponse.data.link,
          author: (<HTMLInputElement> document.getElementById('author')).value,
          upvotes: 0,
          downvotes: 0,
          created: new Date(imageResponse.data.datetime * 1000)
        }
        this.memeService.createMeme(newMeme)
          .subscribe((meme: Meme) => {
            newMeme = meme;
            this.memes.push(newMeme);
            this.memes = this.memes.sort((a, b) => {
              return +new Date(a.created) - +new Date(b.created);
            }).reverse();
            // Share updated meme array with home component
            this.dataService.updateMemes(this.memes);
          });
        this.router.navigate(['/home']);
      })
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
          // add error message
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
