import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-formly-field-file',
  templateUrl: './formly-field-file.component.html',
  styleUrls: ['./formly-field-file.component.scss']
})
export class FormlyFieldFile extends FieldType<FieldTypeConfig> implements OnInit {
  @ViewChild("fileinput") el: ElementRef | undefined;
  selectedFiles: File[] | undefined;
  constructor(public sanitizer: DomSanitizer) {
    super();
  }
  ngOnInit(): void {}
  openFileInput() {
    this.el!.nativeElement.click();
  }
  onDelete(index: number) {
    // this.formControl.reset();
    console.log(this.selectedFiles);
    this.selectedFiles?.splice(index, 1);

    this.formControl.patchValue(this.selectedFiles);
    console.log("Form Control Value", this.formControl.value);
  }
  onChange(event:any) {
    this.selectedFiles = Array.from(event.target.files);
    console.log(this.selectedFiles);
  }
  getSanitizedImageUrl(file: File) {
    return this.sanitizer.bypassSecurityTrustUrl(
      window.URL.createObjectURL(file)
    );
  }
  isImage(file: File): boolean {
    return /^image\//.test(file.type);
  }
}
