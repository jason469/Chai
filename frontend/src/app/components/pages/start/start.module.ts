import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StartRoutingModule} from './start-routing.module';
import {StartComponent} from './start.component';
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
import {BirthdayCardComponent} from "../../shared/start/birthday-card/birthday-card.component";
import {
  HamburgerCloseComponent
} from "../../../shared/customElements/ui/buttons/hamburger-close/hamburger-close.component";
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
  ]
})
export class StartModule {
}
