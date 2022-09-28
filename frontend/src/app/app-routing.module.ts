import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {GenerateComponent} from "./components/pages/generate/generate.component";
import {ProfileComponent} from "./components/pages/profile/profile.component";
import {ScheduleComponent} from "./components/pages/schedule/schedule.component";
import {ViewAllComponent} from "./components/pages/viewBunnies/view-all/view-all.component";
import {ViewOneBunnyComponent} from "./components/pages/viewBunnies/view-one-bunny/view-one-bunny.component";
import {AuthComponent} from "./components/auth/auth.component";

const appRoutes: Routes = [
  {path: 'login', component: AuthComponent},
  {path: 'generate', component: GenerateComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/logout', component: ProfileComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'view-bunnies', component: ViewAllComponent},
  {path: 'view-bunnies/:id', component: ViewOneBunnyComponent},
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
