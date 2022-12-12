import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule),
    data: {animation: ''}
  },
  {
    path: '',
    loadChildren: () => import('./components/pages/start/start.module').then(m => m.StartModule),
    data: {animation: ''}
  },
  {
    path: 'cwimpies',
    loadChildren: () => import('./components/pages/cwimpies/cwimpies.module').then(m => m.CwimpiesModule),
    data: {animation: ''}
  },
  {
    path: 'schedule',
    loadChildren: () => import('./components/pages/schedule/schedule.module').then(m => m.ScheduleModule),
    data: {animation: ''}
  },
  {
    path: 'profile',
    loadChildren: () => import('./components/pages/profile/profile.module').then(m => m.ProfileModule),
    data: {animation: ''}
  },
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
