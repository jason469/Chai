import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule} from "@angular/material/card";
import {LegendMenuComponent} from "../../../partials/location/legend-menu/legend-menu.component";
import {LegendMenuItemDirective} from "../../../../directives/cwimpies/location/legend/legend-menu-item.directive";


@NgModule({
  declarations: [
    LegendMenuComponent,
    LegendMenuItemDirective,
  ],
  exports: [
    LegendMenuComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
  ]
})
export class LocationModule { }
