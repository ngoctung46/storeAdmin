import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { LocalNotifications } from 'ionic-native';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  constructor(public navCtrl: NavController) {
    LocalNotifications.registerPermission();
  }

  

  test(){
    // cordova plugin add https://github.com/Telerik-Verified-Plugins/LocalNotification for ios10
    LocalNotifications.schedule({
      at: new Date(new Date().getTime() + 5 * 1000),
      title: "test",
      text: "test"
     
     
    });

  }
}
