import { Component } from '@angular/core';
import {FieldType, FieldTypeConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-file-field',
  templateUrl: './file-field.component.html',
  styleUrls: ['./file-field.component.scss']
})
export class FileFieldComponent extends FieldType<FieldTypeConfig>{}

