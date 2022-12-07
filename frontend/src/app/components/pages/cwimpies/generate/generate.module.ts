import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule} from "@angular/material/card";
import {AddCwimpieComponent} from "../../../forms/cwimpies/add-cwimpie/add-cwimpie.component";
import {ReactiveFormsModule} from "@angular/forms";
import {FormlyModule} from "@ngx-formly/core";
import {MatButtonModule} from "@angular/material/button";
import {ColourMenuModule} from "../../../shared/helpMenus/colour-menu/colour-menu.module";


@NgModule({
  declarations: [
    AddCwimpieComponent,
  ],
  exports: [
    AddCwimpieComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    FormlyModule,
    MatButtonModule,
    ColourMenuModule,
  ]
})
export class GenerateModule { }
