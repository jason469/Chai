import {Component} from '@angular/core';
import {FieldType, FieldTypeConfig} from '@ngx-formly/core';

@Component({
  selector: 'formly-file-field',
  template: `
    <mat-form-field>
      <ngx-mat-file-input></ngx-mat-file-input>
    </mat-form-field>`,
})
export class FormlyFileField extends FieldType<FieldTypeConfig>{}
