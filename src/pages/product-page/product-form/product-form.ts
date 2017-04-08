import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceValidator } from '../../../validators/price';
/**
 * Generated class for the ProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
    selector: 'product-form',
    templateUrl: 'product-form.html',
    styles: ['product-form.scss']
})
export class ProductForm {
    isEdit: boolean = false;
    submitAttempt: boolean = false;
    productForm: FormGroup;
    products: FirebaseListObservable<any>;
    product: any = {}
    constructor(public navCtrl: NavController, public formBuilder: FormBuilder, public af: AngularFire, public navParams: NavParams) {
        this.product = this.navParams.data.product;
        this.isEdit = this.navParams.data.isEdit;
        this.products = this.af.database.list('/products');
        this.productForm = formBuilder.group({
            name: [this.product.name, Validators.compose([Validators.maxLength(100), Validators.pattern('[a-zA-Z_]*'), Validators.required])],
            description: [this.product.description],
            price: [this.product.price, Validators.compose([Validators.required, PriceValidator.isValid])],
            url: [this.product.url]
        });

    }

    add() {
        this.submitAttempt = true;
        let updateProduct = {
            name: this.productForm.value.name,
            description: this.productForm.value.description,
            price: this.productForm.value.price,
            url: this.productForm.value.url
        };

        if (!this.productForm.valid) {
            return;
        }
        else {

            this.products.push(updateProduct);

        }
        this.navCtrl.pop();
    }

    update() {
        this.submitAttempt = true;
        let updateProduct = {
            name: this.productForm.value.name,
            description: this.productForm.value.description,
            price: this.productForm.value.price,
            url: this.productForm.value.url
        };
        if (!this.productForm.valid) {
            return;
        }
        else {
            this.products.update(this.product.$key, updateProduct);
        }
        this.navCtrl.pop();
    }


}