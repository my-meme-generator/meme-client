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

### Running Application

- Download the repository
- In Visual Studio Code, run the command `npm i` to install node_modules.

### Imgur Registration and Setup

Before running the application, additional steps are required. These instructions will walk you through how to create albums in imgur to store images/memes in, register the application with imgur to allow access to your albums, and instruct you where to store the information in the application.

#### Storing Imgur Keys in Application

- First, in Visual Studio Code, navigate to `/src/app/assets` folder in the file directory.
- Create file called `keys.ts`.
- Inside `keys.ts`, create the following class:
  ```
  export class Keys {
    templateAlbumHash = '';
    memeAlbumHash = '';
    clientId = '';
    clientSecret = '';
    accessToken = '';
    refreshToken = '';
  }
  ```

#### Create Imgur Albums

- Log into imgur. In the top right corner, click on your account name and go to albums. Create two new albums (album names do not matter), one to store image templates used to create a meme and another to store the memes in.
- Once the albums are created, click on each of them, retrieve their hashes (hashes are found at the end of the URL), and enter them into their respective field names in `Keys.ts`.
- Next, download some meme templates and store them in the template album ([imgflip](https://imgflip.com/memetemplates) has some good ones).
  
#### Register Application with Imgur

- Open Postman.
- In a new request, click on Authorization.
- Click on `Get New Access Token`. Enter a token name.
- In a browser, register the application with imgur [here](https://api.imgur.com/oauth2/addclient). Enter an application name and select `OAuth 2 authorization with a callback url`. Next, enter a callback url (`https://localhost:4200/oauth2/callback` works) and an email address.
- Go back to Postman and enter the callback url into the corresponding token request field.
- In Postman, enter `https://api.imgur.com/oauth2/authorize` and `https://api.imgur.com/oauth2/token` into "Auth URL" and "Access Token URL", respectively.
- Go back to imgur, prove you are not a robot and click submit.
- From there, copy the `Client Id` and the `Client Secret` into both your `Keys` class respective fields and the Postman token request fields.
- In Postman, click on `Request Token`. A screen will pop up asking for your imgur account name and password to verify you want to give access to the app.
- You should now have the access token displaying in Postman. Copy that into the `Keys` `accessToken` field. To the left of the access token, there will be a dropdown menu called `Available Tokens`. Click on it and select the name of the newly created token. Copy the refresh token hash and copy into `Keys`.
- Now you can run the application. In Visual Studio Code, run the command `ng serve --open`. This will open a web browser once the program has finished building.

## Built With

- [Visual Studio Code](https://code.visualstudio.com) - Code editor
- [Angular](https://angular.io) - Web framework

## License

This program is licensed under the "MIT License". Please see the file LICENSE in the source distribution of this software for license terms.

## Author

- Cole Phares - [zedzorander](https://github.com/zedzorander)
