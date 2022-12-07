import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AuthComponent} from "./components/auth/auth.component";
import {AuthGuardService} from "./services/auth/auth-guard.service";

import {LocationComponent} from "./components/pages/cwimpies/location/location.component";
import {GenerateComponent} from "./components/pages/cwimpies/generate/generate.component";
import {ViewAllComponent} from "./components/pages/cwimpies/viewCwimpies/view-all/view-all.component";
import {CommandmentsComponent} from "./components/pages/cwimpies/commandments/commandments.component";

const appRoutes: Routes = [
  {path: 'login', component: AuthComponent},
  {path: 'cwimpies/locations', canActivate: [AuthGuardService], component: LocationComponent},
  {path: 'cwimpies/generate', canActivate: [AuthGuardService], component: GenerateComponent},
  {path: 'cwimpies/commandments', canActivate: [AuthGuardService], component: CommandmentsComponent},
  {path: 'cwimpies/view-cwimpies', canActivate: [AuthGuardService], component: ViewAllComponent},
  { path: '', loadChildren: () => import('./components/pages/start/start.module').then(m => m.StartModule) },
  { path: 'schedule', loadChildren: () => import('./components/pages/schedule/schedule.module').then(m => m.ScheduleModule) },
  { path: 'profile', loadChildren: () => import('./components/pages/profile/profile.module').then(m => m.ProfileModule) },
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
