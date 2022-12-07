import {Directive, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output, Renderer2} from '@angular/core';

@Directive({
  selector: '[appLegendMenuItem]'
})
export class LegendMenuItemDirective {

  constructor(
    private element: ElementRef,
    private renderer: Renderer2
  ) {
  }

  @Input() prefix: string = ''
  @Input() isMultiStopItem: boolean = false;
  @Output() menuItemData: EventEmitter<any> = new EventEmitter<any>()

  @HostBinding('style.textDecoration') textDecoration: string = ''
  viewStatus: boolean = true

  @HostListener('click') toggleStatus() {
    this.textDecoration = (this.textDecoration == 'line-through') ? '' : 'line-through'  // Strike out the item
    this.viewStatus = (!this.viewStatus)  // Toggle the status

    this.menuItemData.emit({
      "viewStatus": this.viewStatus,
      "prefix": this.prefix,
      "isMultiStopItem": this.isMultiStopItem
    })
  }
}
