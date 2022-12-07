import {Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[appFilterTab]'
})
export class FilterTabDirective {
  @Input('filterValue') filterValue: string = ''
  @Output() filterTabData: EventEmitter<any> = new EventEmitter<any>()

  constructor(
    private renderer: Renderer2,
    hostElement: ElementRef
  ) {
  }

  @HostListener('click') toggleStatus() {
    this.filterTabData.emit({
      "filterValue": this.filterValue,
    })
  }

}
