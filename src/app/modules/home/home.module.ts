import { HomeService } from './home.service';
import { NgModule } from '@angular/core';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  imports: [
    SharedModule,
    HomePageRoutingModule,
    HttpClientModule
  ],
  declarations: [HomePage],
  providers: [
    HomeService
  ]
})
export class HomePageModule {}
