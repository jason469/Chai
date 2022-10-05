import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {GenerateComponent} from "./components/pages/generate/generate.component";
import {ProfileComponent} from "./components/pages/profile/profile.component";
import {ScheduleComponent} from "./components/pages/schedule/schedule.component";
import {ViewAllComponent} from "./components/pages/viewBunnies/view-all/view-all.component";
import {ViewOneBunnyComponent} from "./components/pages/viewBunnies/view-one-bunny/view-one-bunny.component";
import {AuthComponent} from "./components/auth/auth.component";
import {AuthGuardService} from "./services/auth-guard.service";

const appRoutes: Routes = [
  {path: 'login', component: AuthComponent},
  {path: 'generate', canActivate: [AuthGuardService], component: GenerateComponent},
  {path: 'profile', canActivate: [AuthGuardService], component: ProfileComponent},
  {path: 'schedule', canActivate: [AuthGuardService], component: ScheduleComponent},
  {path: 'view-bunnies', canActivate: [AuthGuardService], component: ViewAllComponent},
  {path: 'view-bunnies/:id', canActivate: [AuthGuardService], component: ViewOneBunnyComponent},
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
