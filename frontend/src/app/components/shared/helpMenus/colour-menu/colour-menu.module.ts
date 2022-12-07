import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ColourMenuComponent} from "./colour-menu.component";


@NgModule({
  declarations: [
    ColourMenuComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    ColourMenuComponent
  ]
})
export class ColourMenuModule {
}
