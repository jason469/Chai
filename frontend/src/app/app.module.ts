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
import {PanelWrapperComponent} from "./shared/customFormElements/ui/wrappers/panel-wrapper/panel-wrapper.component";
import {FormlyMatDatepickerModule} from '@ngx-formly/material/datepicker';
import {CommandmentsComponent} from './components/pages/cwimpies/commandments/commandments.component';
import {AddNewFieldComponent} from './shared/customFormElements/ui/buttons/add-new-field/add-new-field.component';
import {UpdateCwimpiesComponent} from './components/forms/cwimpies/update-cwimpies/update-cwimpies.component';
import {StepperComponent} from './shared/customFormElements/ui/layouts/stepper/stepper.component';
import {MatStepperModule} from "@angular/material/stepper";
import {CwimpieFormService} from "./services/cwimpies/cwimpieForm.service";
import {FileValueAccessor} from "./shared/customFormElements/fields/file-value-accessor";
import {BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {hexCodeValidator} from "./shared/functions/fileValidation";
import {LocationComponent} from './components/pages/cwimpies/location/location.component';
import {
  DailyScheduleCardComponent
} from './components/shared/dailySchedule/daily-schedule-card/daily-schedule-card.component';
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';
import {LegendMenuComponent} from './components/partials/location/legend-menu/legend-menu.component';
import {LegendMenuItemDirective} from './directives/cwimpies/location/legend/legend-menu-item.directive';
import {
  FormlyFieldFile,
} from './shared/customFormElements/fields/formly-field-file/formly-field-file.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GenerateComponent,
    ProfileComponent,
    ScheduleComponent,
    ViewAllComponent,
    AuthComponent,
    ReducedCwimpieCardComponent,
    FullCwimpieModalComponent,
    AddCwimpieComponent,
    CommandmentsComponent,
    PanelWrapperComponent,
    AddNewFieldComponent,
    UpdateCwimpiesComponent,
    StepperComponent,
    LocationComponent,
    DailyScheduleCardComponent,
    LegendMenuComponent,
    LegendMenuItemDirective,
    FileValueAccessor,
    FormlyFieldFile
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
        {name: 'file', component: FormlyFieldFile, wrappers: []},
        {name: 'stepper', component: StepperComponent, wrappers: []},
        {name: 'repeat', component: AddNewFieldComponent},
        {
          name: 'password', extends: 'input', defaultOptions: {props: {type: 'password',},},
        },
      ],
      wrappers: [
        {name: 'panel', component: PanelWrapperComponent}
      ],
      validators: [
        {name: "VHexCode", validation: hexCodeValidator}
      ],
      validationMessages: [
        {name: 'required', message: 'This field is requiredddd'},
        {name: 'VHexCode', message: 'The value isn\'t a valid hex codeeeee'}
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
    MatStepperModule,
    ModalModule.forRoot(),
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox.accessToken, // Optional, can also be set per map (accessToken input of mgl-map)
    })
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    CwimpieFormService,
    BsModalService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
