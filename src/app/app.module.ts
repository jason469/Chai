import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './components/partials/header/header.component';

import {
  MatMenuModule,
} from '@angular/material/menu';
import {
  MatIconModule
} from '@angular/material/icon';
import {
  MatButtonModule
} from "@angular/material/button";
import {GenerateComponent} from './components/pages/generate/generate.component';
import {ProfileComponent} from './components/pages/profile/profile.component';
import {ScheduleComponent} from './components/pages/schedule/schedule.component';
import {RouterModule, Routes} from "@angular/router";
import { ViewAllComponent } from './components/pages/viewBunnies/view-all/view-all.component';
import { ViewOneBunnyComponent } from './components/pages/viewBunnies/view-one-bunny/view-one-bunny.component';

const appRoutes: Routes = [
  {path: 'generate', component: GenerateComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'schedule', component: ScheduleComponent},
  {path: 'view', component: ViewAllComponent},
  {path: 'view/:id', component: ViewOneBunnyComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GenerateComponent,
    ProfileComponent,
    ScheduleComponent,
    ViewAllComponent,
    ViewOneBunnyComponent,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
