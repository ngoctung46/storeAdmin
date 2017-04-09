import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersPage } from './orders';
import { OrderDetailPage } from './order-detail/order-detail';

@NgModule({
  declarations: [
    OrdersPage,
    OrderDetailPage
  ],
  imports: [
    IonicPageModule.forChild([OrdersPage, OrderDetailPage]),
  ],
  exports: [
    OrdersPage,
    OrderDetailPage
  ]
})
export class OrdersModule {}
