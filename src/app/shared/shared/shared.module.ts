import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const sharedModules = [
  CommonModule,
  FormsModule,
  IonicModule,
];

@NgModule({
  declarations: [],
  imports: [...sharedModules],
  exports: [...sharedModules]
})
export class SharedModule { }
