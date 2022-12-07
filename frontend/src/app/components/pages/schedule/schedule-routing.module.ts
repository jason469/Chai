import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ScheduleComponent} from './schedule.component';
import {AuthGuardService} from "../../../services/auth/auth-guard.service";

const routes: Routes = [{path: '', canActivate: [AuthGuardService], component: ScheduleComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule {
}
