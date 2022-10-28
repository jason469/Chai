import {Component, OnInit} from '@angular/core';
import {FieldType, FieldTypeConfig, FormlyFieldConfig, FormlyFieldProps} from "@ngx-formly/core";

@Component({
  selector: 'app-add-new-field',
  templateUrl: './add-new-field.component.html',
  styleUrls: ['./add-new-field.component.scss']
})

export class AddNewFieldComponent extends FieldType<FieldTypeConfig>{
  addField() {
    let newGroup = this.field.fieldGroup![0]
    this.field.fieldGroup!.splice(1, 0, newGroup)
    this.field.fieldGroup = this.field.fieldGroup!.map(field => field);
  }
}
