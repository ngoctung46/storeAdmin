import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire, public alertCtrl: AlertController) {
    this.modifiers = af.database.list('/modifiers');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifierPage');
  }

  addModifier(){
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
          handler: data => { console.log('Canceld clicked')}
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

}
