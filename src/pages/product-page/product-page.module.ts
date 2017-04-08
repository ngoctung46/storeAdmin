import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductPage} from './product-page';
import { ProductForm } from './product-form/product-form';
@NgModule({
  declarations: [
    ProductPage,
    ProductForm

  ],
  imports: [
    IonicPageModule.forChild([ProductPage, ProductForm]),
    
  ],
  exports: [
    ProductPage,
    ProductForm

  ]
})
export class ProductPageModule {}
