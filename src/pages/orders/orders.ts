import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/**
 * Generated class for the Orders page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {
  orders: FirebaseListObservable<any>;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public af: AngularFire,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController) {
      this.orders = af.database.list('/orders');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Orders');
  }

  addOrder() {
    let prompt = this.alertCtrl.create({
      title: 'Order Name',
      message: 'Please enter new order name',
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => { console.log('Canceld clicked') }
        },
        {
          text: 'Save',
          handler: data => {
            this.orders.push({
              name: data.name
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
