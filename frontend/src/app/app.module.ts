import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './components/partials/header/header.component';
import {ToastrModule} from 'ngx-toastr'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule,} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from "@angular/material/button";
import {GenerateComponent} from './components/pages/generate/generate.component';
import {ProfileComponent} from './components/pages/profile/profile.component';
import {ScheduleComponent} from './components/pages/schedule/schedule.component';
import {ViewAllComponent} from './components/pages/viewBunnies/view-all/view-all.component';
import {ViewOneBunnyComponent} from './components/pages/viewBunnies/view-one-bunny/view-one-bunny.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthComponent} from "./components/auth/auth.component";
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {AuthInterceptorService} from "./services/auth-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GenerateComponent,
    ProfileComponent,
    ScheduleComponent,
    ViewAllComponent,
    ViewOneBunnyComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    AppRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyMaterialModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false
    }),
  ],
  providers: [AuthService, AuthGuardService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
