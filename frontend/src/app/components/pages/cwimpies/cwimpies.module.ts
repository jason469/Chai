import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ViewAllComponent} from "./viewCwimpies/view-all/view-all.component";
import {LocationComponent} from "./location/location.component";
import {GenerateComponent} from "./generate/generate.component";
import {CommandmentsComponent} from "./commandments/commandments.component";
import {ViewAllModule} from "./viewCwimpies/view-all/view-all.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {LocationModule} from "./location/location.module";
import {GenerateModule} from "./generate/generate.module";
import {CwimpiesRoutingModule} from "./cwimpies-routing.module";
import {ColourMenuComponent} from "../../shared/helpMenus/colour-menu/colour-menu.component";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    ViewAllComponent,
    LocationComponent,
    GenerateComponent,
    CommandmentsComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    ViewAllModule,
    LocationModule,
    GenerateModule,
    MatProgressSpinnerModule,
    CwimpiesRoutingModule,
    MatButtonModule
  ]
})
export class CwimpiesModule { }
