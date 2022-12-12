import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {ProfileCwimpieCardComponent} from "../../shared/profile/profile-cwimpie-card/profile-cwimpie-card.component";
import {MatCardModule} from "@angular/material/card";
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileCwimpieCardComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatCardModule,
    MdbCarouselModule
  ]
})
export class ProfileModule { }
