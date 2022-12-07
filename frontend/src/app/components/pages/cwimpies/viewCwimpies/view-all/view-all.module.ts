import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCardModule} from "@angular/material/card";
import {FilterTabDirective} from "../../../../../directives/cwimpies/viewAll/filter-tab.directive";
import {ActiveTabDirective} from "../../../../../directives/cwimpies/viewAll/active-tab.directive";
import {
  ReducedCwimpieCardComponent
} from "../../../../shared/cwimpies/reduced-cwimpie-card/reduced-cwimpie-card.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {FullCwimpieModalComponent} from "../../../../shared/cwimpies/full-cwimpie-modal/full-cwimpie-modal.component";
import {CwimpieStampComponent} from "../../../../shared/cwimpies/cwimpie-stamp/cwimpie-stamp.component";


@NgModule({
  declarations: [
    FilterTabDirective,
    ActiveTabDirective,
    ReducedCwimpieCardComponent,
    FullCwimpieModalComponent,
    CwimpieStampComponent,
  ],
  exports: [
    FilterTabDirective,
    ActiveTabDirective,
    ReducedCwimpieCardComponent,
    FullCwimpieModalComponent,
    CwimpieStampComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class ViewAllModule { }
