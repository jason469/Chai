import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AuthComponent} from "./components/auth/auth.component";
import {AuthGuardService} from "./services/auth/auth-guard.service";

import {GenerateComponent} from "./components/pages/cwimpies/generate/generate.component";
import {ProfileComponent} from "./components/pages/profile/profile.component";
import {ScheduleComponent} from "./components/pages/schedule/schedule.component";
import {ViewAllComponent} from "./components/pages/cwimpies/viewCwimpies/view-all/view-all.component";
import {ViewOneCwimpieComponent} from "./components/pages/cwimpies/viewCwimpies/view-one-cwimpie/view-one-cwimpie.component";
import {CommandmentsComponent} from "./components/pages/cwimpies/commandments/commandments.component";

const appRoutes: Routes = [
  {path: 'login', component: AuthComponent},
  {path: 'cwimpies/generate', canActivate: [AuthGuardService], component: GenerateComponent},
  {path: 'cwimpies/commandments', canActivate: [AuthGuardService], component: CommandmentsComponent},
  {path: 'cwimpies/view-cwimpies', canActivate: [AuthGuardService], component: ViewAllComponent},
  {path: 'cwimpies/view-cwimpies/:id', canActivate: [AuthGuardService], component: ViewOneCwimpieComponent},
  {path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent},
  {path: 'schedule', canActivate: [AuthGuardService], component: ScheduleComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule {

}
