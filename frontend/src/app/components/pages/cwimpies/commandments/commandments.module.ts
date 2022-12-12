import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule} from "@angular/material/card";
import {CommandmentItemComponent} from "../../../shared/cwimpies/commandment-item/commandment-item.component";


@NgModule({
  declarations: [
    CommandmentItemComponent,
  ],
  exports: [
    CommandmentItemComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class CommandmentsModule { }
