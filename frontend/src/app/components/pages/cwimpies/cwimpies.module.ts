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


@NgModule({
  declarations: [
    ViewAllComponent,
    LocationComponent,
    GenerateComponent,
    CommandmentsComponent,
  ],
  imports: [
    CommonModule,
    ViewAllModule,
    LocationModule,
    GenerateModule,
    MatProgressSpinnerModule,
    CwimpiesRoutingModule
  ]
})
export class CwimpiesModule { }
