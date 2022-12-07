import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {ProfileCwimpieCardComponent} from "../../shared/profile/profile-cwimpie-card/profile-cwimpie-card.component";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileCwimpieCardComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatCardModule
  ]
})
export class ProfileModule { }
