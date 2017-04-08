import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifierPage } from './modifier-page';

@NgModule({
  declarations: [
    ModifierPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifierPage),
   
  ],
  exports: [
    ModifierPage
  ]
})
export class ModifierPageModule {}
