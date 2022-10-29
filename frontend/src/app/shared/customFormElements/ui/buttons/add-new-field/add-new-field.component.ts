import {Component, OnInit} from '@angular/core';
import {FieldType, FieldTypeConfig, FormlyFieldConfig, FormlyFieldProps} from "@ngx-formly/core";

@Component({
  selector: 'app-add-new-field',
  templateUrl: './add-new-field.component.html',
  styleUrls: ['./add-new-field.component.scss']
})

export class AddNewFieldComponent extends FieldType<FieldTypeConfig>{
  removeField(itemIndex: number) {
    this.field.fieldGroup!.splice(itemIndex, 1)
    this.field.fieldGroup = this.field.fieldGroup!.map(field => field);
  }

  addField() {
    let newGroup = this.field.fieldGroup![0]
    newGroup.key = `${this.field.fieldGroup![0].key!.toString().slice(0,-1)}${this.field.fieldGroup!.length}`
    this.field.fieldGroup!.splice(1, 0, newGroup)
    this.field.fieldGroup = this.field.fieldGroup!.map(field => field);
  }
}
