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
import {AppRoutingModule} from "./app-routing.module";
import {ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyMaterialModule} from '@ngx-formly/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./services/auth/auth.service";
import {AuthGuardService} from "./services/auth/auth-guard.service";
import {AuthInterceptorService} from "./services/auth/auth-interceptor.service";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTabsModule} from "@angular/material/tabs";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgxMatFileInputModule} from '@angular-material-components/file-input';
import {PanelWrapperComponent} from "./shared/customFormElements/ui/wrappers/panel-wrapper/panel-wrapper.component";
import {FormlyMatDatepickerModule} from '@ngx-formly/material/datepicker';
import {AddNewFieldComponent} from './shared/customFormElements/ui/buttons/add-new-field/add-new-field.component';
import {UpdateCwimpiesComponent} from './components/forms/cwimpies/update-cwimpies/update-cwimpies.component';
import {StepperComponent} from './shared/customFormElements/ui/layouts/stepper/stepper.component';
import {MatStepperModule} from "@angular/material/stepper";
import {CwimpieFormService} from "./services/cwimpies/cwimpieForm.service";
import {FileValueAccessor} from "./shared/customFormElements/fields/file-value-accessor";
import {BsModalService, ModalModule} from 'ngx-bootstrap/modal';
import {hexCodeValidator} from "./shared/functions/fileValidation";
import {NgxMapboxGLModule} from 'ngx-mapbox-gl';
import {FormlyFieldFile,} from './shared/customFormElements/fields/formly-field-file/formly-field-file.component';
import {MdbCollapseModule} from "mdb-angular-ui-kit/collapse";
import {MdbDropdownModule} from "mdb-angular-ui-kit/dropdown";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MdbCarouselModule} from "mdb-angular-ui-kit/carousel";
import {FooterComponent} from './components/partials/footer/footer.component';
import {GenerateModule} from "./components/pages/cwimpies/generate/generate.module";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PanelWrapperComponent,
    AddNewFieldComponent,
    UpdateCwimpiesComponent,
    StepperComponent,
    FileValueAccessor,
    FormlyFieldFile,
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
    }),
    MdbCollapseModule,
    MdbDropdownModule,
    MatTooltipModule,
    MdbCarouselModule,
    GenerateModule
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
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
