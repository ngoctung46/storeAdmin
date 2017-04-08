import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { ModifierPageModule } from '../pages/modifier-page/modifier-page.module';
import { BackgroundMode } from '@ionic-native/background-mode';
import { OrdersModule } from '../pages/orders/orders.module';
export const config = {
  apiKey: "AIzaSyBhyx9qtOO7VYKaUbGUW32L9pwamQqL6Aw",
  authDomain: "fire-base-demo-13f1d.firebaseapp.com",
  databaseURL: "https://fire-base-demo-13f1d.firebaseio.com",
  projectId: "fire-base-demo-13f1d",
  storageBucket: "fire-base-demo-13f1d.appspot.com",
  messagingSenderId: "292281296546"
}
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    ModifierPageModule,
    OrdersModule,
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    BackgroundMode,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
