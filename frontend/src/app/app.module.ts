import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeaderComponent} from './components/partials/header/header.component';
import {ToastrModule} from 'ngx-toastr'
import {AppRoutingModule} from "./app-routing.module";
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth/auth.service";
import {AuthGuardService} from "./services/auth/auth-guard.service";
import {AuthInterceptorService} from "./services/auth/auth-interceptor.service";
import {MatNativeDateModule} from "@angular/material/core";
import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import {PanelWrapperComponent} from "./shared/customFormElements/ui/wrappers/panel-wrapper/panel-wrapper.component";
import {FormlyMatDatepickerModule} from '@ngx-formly/material/datepicker';
import {AddNewFieldComponent} from './shared/customFormElements/ui/buttons/add-new-field/add-new-field.component';
import {StepperComponent} from './shared/customFormElements/ui/layouts/stepper/stepper.component';
import {MatStepperModule} from "@angular/material/stepper";
import {FileValueAccessor} from "./shared/customFormElements/fields/file-value-accessor";
import {BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {hexCodeValidator} from "./shared/utils/fileValidation";
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';
import {FormlyFieldFile,} from './shared/customFormElements/fields/formly-field-file/formly-field-file.component';
import {MdbCollapseModule} from "mdb-angular-ui-kit/collapse";
import {MdbDropdownModule} from "mdb-angular-ui-kit/dropdown";
import {FooterComponent} from './components/partials/footer/footer.component';
import {
  DeleteCwimpieDialogComponent
} from './components/shared/cwimpies/delete-cwimpie-dialog/delete-cwimpie-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AppComponent,

    // All page components
    HeaderComponent,
    FooterComponent,

    // Form components
    PanelWrapperComponent,
    AddNewFieldComponent,
    StepperComponent,
    FileValueAccessor,
    FormlyFieldFile,
    DeleteCwimpieDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    // Service Worker Modules for PWA config
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),

    // Global form settings
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
    ReactiveFormsModule,
    NgxMatFileInputModule,
    MatNativeDateModule,
    FormlyMatDatepickerModule,

    // Global Toastr Module
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      newestOnTop: false
    }),

    // Global Modal Module
    ModalModule.forRoot(),

    // Global Mapbox Module
    NgxMapboxGLModule.withConfig({
      accessToken: environment.mapbox.accessToken,
    }),

    // Global Page Modules
    MdbDropdownModule,
    MdbCollapseModule,
    MatStepperModule,
    MatDialogModule,
    MatButtonModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    BsModalService,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
