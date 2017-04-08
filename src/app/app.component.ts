import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ModifierPage } from '../pages/modifier-page/modifier-page';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  modifiers: FirebaseListObservable<any>;
  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public af: AngularFire,
    public localNotifications: LocalNotifications
    ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Modifier', component: ModifierPage }
    ];

    this.modifiers = af.database.list('/modifiers');
    this.modifiers.subscribe(()=>{
     
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  notificationTest(){
     this.localNotifications.schedule({
        id:1,
        title: 'Modifiers',
        text: 'Modifiers list has been changed',
        data: {message: 'Please check your list'}
      });
  }
}
