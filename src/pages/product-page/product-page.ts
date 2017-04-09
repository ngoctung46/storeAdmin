import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ProductForm } from './product-form/product-form';
/**
 * Generated class for the ProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-product-page',
  templateUrl: 'product-page.html',
})
export class ProductPage {
  products: FirebaseListObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public actionSheetCtrl: ActionSheetController) {
    this.products = af.database.list('/products');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  showOptions(product) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Bạn muốn làm gì?',
      buttons: [
        {
          text: 'Xóa',
          role: 'destructive',
          handler: () => {
            this.removeProduct(product.$key);
          }
        }, {
          text: 'Sửa',
          handler: () => {
            this.gotoProductForm(product);
          }
        }, {
          text: 'Hủy',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();

  }

  addProduct(){
    this.navCtrl.push(ProductForm,{ product: {}, isEdit: false });
  }

  removeProduct(productKey) {
    this.products.remove(productKey);
  }

  updateProduct(product){

  }
  
  gotoProductForm(product){
    this.navCtrl.push(ProductForm,{ product: product, isEdit: true });
  }

}



