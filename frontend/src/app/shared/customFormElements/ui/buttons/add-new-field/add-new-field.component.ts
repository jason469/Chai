import {Component} from '@angular/core';
import {FieldType, FieldTypeConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-add-new-field',
  templateUrl: './add-new-field.component.html',
  styleUrls: ['./add-new-field.component.scss']
})

export class AddNewFieldComponent extends FieldType<FieldTypeConfig> {
}
