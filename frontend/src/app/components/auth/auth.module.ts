import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AuthRoutingModule} from "./auth-routing.module";
import {AuthComponent} from "./auth.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {FormlyModule} from "@ngx-formly/core";


@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatButtonModule,
    FormlyModule
  ]
})
export class AuthModule { }
