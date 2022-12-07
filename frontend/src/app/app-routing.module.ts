import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {AuthComponent} from "./components/auth/auth.component";
import {AuthGuardService} from "./services/auth/auth-guard.service";

const appRoutes: Routes = [
  {path: 'login', component: AuthComponent},
  { path: '', loadChildren: () => import('./components/pages/start/start.module').then(m => m.StartModule) },
  { path: 'cwimpies', loadChildren: () => import('./components/pages/cwimpies/cwimpies.module').then(m => m.CwimpiesModule) },
  { path: 'schedule', loadChildren: () => import('./components/pages/schedule/schedule.module').then(m => m.ScheduleModule) },
  { path: 'profile', loadChildren: () => import('./components/pages/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'auth', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
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
