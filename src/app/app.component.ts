import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import * as firebase from 'firebase';
const config = {
  apiKey: "AIzaSyBq3S627TMjcGDRVVlktO-UGIhxacUgI7U",
  authDomain: "whosapp-84834.firebaseapp.com",
  databaseURL: "https://whosapp-84834.firebaseio.com",
  projectId: "whosapp-84834",
  storageBucket: "whosapp-84834.appspot.com",
  messagingSenderId: "958371709510"
};
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

