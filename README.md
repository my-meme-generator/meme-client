# Memerables Client

Memerables is a meme generator application developed for a Web Development class at [Portland State University](https://www.pdx.edu/).

## Getting Started

These instructions will you get a copy of the project up and running on your local machine for development purposes.

### Prerequisites Windows

What you need to run meme-client on Windows 10

- Install [Node.js and npm ](https://nodejs.org/en/download/).
- Install the angular cli by running the following command from the terminal: 
  - `npm install -g @angular/cli`
- Create [imgur](https://imgur.com/) account.
- Install [Postman](https://www.getpostman.com/apps).

### Create albums in Imgur

- First, navigate to the assets folder in the file directory.
- Create file called `keys.ts`.
- Create the following class 
  - ```export class Keys {
        templateAlbumHash: string = '';
        memeAlbumHash: string = '';
        clientId: string = '';
        clientSecret: string = '';
        accessToken: string = '';
        refreshToken: string = '';
      }```
- After logging in to imgur, go to albums and create two new albums
- 

### Register Application With Imgur

- Open Postman
- In a new request, click on Authorization
- Click on "Get New Access Token"

### Running Application

- Download the repository
- In Visual Studio Code, run the command `npm i` to install node_modules.
- In Visual Studio Code, run the command `ng serve --open`. This will open a web browser.

## Built With

- [Visual Studio Code](https://code.visualstudio.com) - Code editor
- [Angular](https://angular.io) - Web framework

## License

This program is licensed under the "MIT License". Please see the file LICENSE in the source distribution of this software for license terms.

## Author

- Cole Phares - [zedzorander](https://github.com/zedzorander)
