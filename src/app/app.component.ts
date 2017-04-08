import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { OrdersPage } from '../pages/orders/orders';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { ModifierPage } from '../pages/modifier-page/modifier-page';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  orders: FirebaseListObservable<any>;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public af: AngularFire,
    public notifications: LocalNotifications,
    public backgroundMode: BackgroundMode
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Modifier', component: ModifierPage },
      { title: 'Orders', component: OrdersPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.orders = this.af.database.list('/orders');
      this.backgroundMode.enable();

      this.backgroundMode.on('activate').subscribe(() => {
        this.orders.subscribe(() => {
          this.notifications.schedule({
            title: 'New Order',
            text: 'New order has been placed, please check the order list',
            at: new Date(new Date().getTime() + 5 * 1000),

          });
          console.log('new order placed');
        });
      });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
