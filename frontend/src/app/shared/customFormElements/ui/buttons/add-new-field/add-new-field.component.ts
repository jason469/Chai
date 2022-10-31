import {Component, OnInit} from '@angular/core';
import {FieldArrayType} from "@ngx-formly/core";

@Component({
  selector: 'app-add-new-field',
  templateUrl: './add-new-field.component.html',
  styleUrls: ['./add-new-field.component.scss']
})

export class AddNewFieldComponent extends FieldArrayType implements OnInit{
  ngOnInit() {
    console.log(this)
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  removeField(itemIndex: number) {
    this.remove(itemIndex)
  }

  addField() {
    this.add()
  }
}
