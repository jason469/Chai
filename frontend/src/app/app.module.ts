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
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {GenerateComponent} from './components/pages/cwimpies/generate/generate.component';
import {ProfileComponent} from './components/pages/profile/profile.component';
import {ScheduleComponent} from './components/pages/schedule/schedule.component';
import {ViewAllComponent} from './components/pages/cwimpies/viewCwimpies/view-all/view-all.component';
import {
  ViewOneCwimpieComponent
} from './components/pages/cwimpies/viewCwimpies/view-one-cwimpie/view-one-cwimpie.component';
import {AppRoutingModule} from "./app-routing.module";
import {AuthComponent} from "./components/auth/auth.component";
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth/auth.service";
import {AuthGuardService} from "./services/auth/auth-guard.service";
import {AuthInterceptorService} from "./services/auth/auth-interceptor.service";
import {
  ReducedCwimpieCardComponent
} from './components/shared/cwimpies/reduced-cwimpie-card/reduced-cwimpie-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTabsModule} from "@angular/material/tabs";
import {FullCwimpieModalComponent} from './components/shared/cwimpies/full-cwimpie-modal/full-cwimpie-modal.component';
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {AddCwimpieComponent} from './components/forms/cwimpies/add-cwimpie/add-cwimpie.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import {FormlyFileField} from "./shared/customFormElements/fields/fileField";
import {PanelWrapperComponent} from "./shared/customFormElements/ui/wrappers/panel-wrapper";
import {FormlyMatDatepickerModule} from '@ngx-formly/material/datepicker';
import {CommandmentsComponent} from './components/pages/cwimpies/commandments/commandments.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GenerateComponent,
    ProfileComponent,
    ScheduleComponent,
    ViewAllComponent,
    ViewOneCwimpieComponent,
    AuthComponent,
    ReducedCwimpieCardComponent,
    FullCwimpieModalComponent,
    AddCwimpieComponent,
    FormlyFileField,
    CommandmentsComponent,
    PanelWrapperComponent
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
    FormlyModule.forRoot({
      types: [
        {name: 'file', component: FormlyFileField},
      ],
      wrappers: [
        {name: 'panel', component: PanelWrapperComponent}
      ],
    }),
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
    MatCardModule,
    MatGridListModule,
    MatTabsModule,
    MatDialogModule,
    MatRippleModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMatFileInputModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
