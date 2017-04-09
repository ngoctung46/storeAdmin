import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  AlertController,
  ActionSheetController
} from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

/**
 * Generated class for the ModifierPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modifier-page',
  templateUrl: 'modifier-page.html',
})
export class ModifierPage {
  modifiers: FirebaseListObservable<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public af: AngularFire,
    public alertCtrl: AlertController,
    public actionSheetCtrl: ActionSheetController) {
    this.modifiers = af.database.list('/modifiers');
    this.modifiers.subscribe(x => console.log(x));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifierPage');
  }

  addModifier() {
    let prompt = this.alertCtrl.create({
      title: 'Tên Cách Chế Biến',
      message: 'Làm ơn điền vào cách chế biến mới',
      inputs: [
        {
          name: 'name',
          placeholder: 'name'
        }
      ],
      buttons: [
        {
          text: 'Hủy',
          handler: data => { console.log('Canceld clicked') }
        },
        {
          text: 'Lưu',
          handler: data => {
            this.modifiers.push({
              name: data.name
            });
          }
        }
      ]
    });
    prompt.present();
  }
  showOptions(modifier) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Bạn muốn làm gì?',
      buttons: [
        {
          text: 'Xóa',
          role: 'destructive',
          handler: () => {
            this.removeModifier(modifier.$key);
          }
        }, {
          text: 'Sửa',
          handler: () => {
            this.updateModifier(modifier);
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

  removeModifier(modifierKey) {
    this.modifiers.remove(modifierKey);
  }

  updateModifier(modifier) {
     let prompt = this.alertCtrl.create({
    title: 'Sửa Cách chế biến',
    message: "Sửa tên cách chế biến",
    inputs: [
      {
        name: 'name',
        placeholder: 'Tên cách chế biến',
        value: modifier.name
      },
    ],
    buttons: [
      {
        text: 'Hủy',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Lưu',
        handler: data => {
          this.modifiers.update(modifier.$key, {
            name: data.name
          });
        }
      }
    ]
  });
  prompt.present();
  }

}
