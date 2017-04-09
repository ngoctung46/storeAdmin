import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector:'order-detail',
    templateUrl:'order-detail.html'
})
export class OrderDetailPage{
    order:any;
    constructor(public navController:NavController, public navParams: NavParams){
        this.order = this.navParams.data.order;
    }
    getTotal(){
    let total: number = 0;
    this.order.orderLines.forEach(ol => total += ol.price * ol.quantity);
    return total;
  }
}

