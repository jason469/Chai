import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import {AuthGuardService} from "../../../services/auth/auth-guard.service";

const routes: Routes = [{ path: '', canActivate: [AuthGuardService], component: ProfileComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
