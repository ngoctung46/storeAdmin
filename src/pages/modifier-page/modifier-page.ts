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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifierPage');
  }

  addModifier() {
    let prompt = this.alertCtrl.create({
      title: 'Modifier Name',
      message: 'Please enter new modifier name',
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
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Delete Song',
          role: 'destructive',
          handler: () => {
            this.removeModifier(modifier.$key);
          }
        }, {
          text: 'Update title',
          handler: () => {
            this.updateModifier(modifier);
          }
        }, {
          text: 'Cancel',
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
    title: 'Modifier Name',
    message: "Update the modifier name",
    inputs: [
      {
        name: 'name',
        placeholder: 'Modifier Name',
        value: modifier.name
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
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
