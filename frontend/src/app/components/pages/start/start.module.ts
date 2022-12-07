import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StartRoutingModule} from './start-routing.module';
import {StartComponent} from './start.component';
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
import {BirthdayCardComponent} from "../../shared/start/birthday-card/birthday-card.component";
// import {AppModule} from "../../../app.module";


@NgModule({
  declarations: [
    StartComponent,
    BirthdayCardComponent,
  ],
  imports: [
    CommonModule,
    StartRoutingModule,
    MdbCarouselModule,
    // AppModule
  ]
})
export class StartModule {
}
