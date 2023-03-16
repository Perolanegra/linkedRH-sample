import { SharedModule } from './../../shared/shared/shared.module';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { IonicRouteStrategy } from '@ionic/angular';

import { CollaboratorComponent } from './collaborator.component';
import { CollaboratorRoutingModule } from './collaborator-routing.module';

@NgModule({
  declarations: [CollaboratorComponent],
  imports: [SharedModule, CollaboratorRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
})
export class CollaboratorModule {}
