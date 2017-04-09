import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { OrderDetailPage } from './order-detail/order-detail';

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

  gotoOrderDetail(order){
    this.navCtrl.push(OrderDetailPage, {order: order})
  }

  removeOrder(order){
    this.orders.remove(order.$key);
  }

}
