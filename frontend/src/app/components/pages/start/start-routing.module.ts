import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StartComponent} from './start.component';
import {AuthGuardService} from "../../../services/auth/auth-guard.service";

const routes: Routes = [
  {path: '', canActivate: [AuthGuardService], component: StartComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartRoutingModule {
}
