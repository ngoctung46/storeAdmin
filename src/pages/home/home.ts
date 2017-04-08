import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LocalNotifications } from '@ionic-native/local-notifications';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  modifiers: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public localNotify: LocalNotifications) {
    
  }

  test(){
    this.localNotify.schedule({
      id: 1,
      title: "test",
      text: 'test'
    });
  }

}
