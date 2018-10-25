import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CreateMemeComponent } from './components/create-meme/create-meme.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateMemeComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
