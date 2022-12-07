import {ContentChildren, Directive, ElementRef, HostListener, QueryList, Renderer2} from '@angular/core';

@Directive({
  selector: '[appActiveTab]'
})
export class ActiveTabDirective {
  @ContentChildren('options') options!: QueryList<ElementRef>;

  constructor(
    private renderer: Renderer2,
    private hostElement: ElementRef
  ) {
  }

  ngAfterContentInit() {
    this.renderer.addClass(
      this.options.toArray()[0].nativeElement,
      'active'
    );
  }

  @HostListener('click', ['$event.target'])
  toggleActiveStatus(target: any) {
    this.showActiveTable('active', target)
  }

  showActiveTable(className: string, target: any) {
    this.options.toArray().forEach((item:ElementRef) => {
      if (target.id === item.nativeElement.id) {
        if (!item.nativeElement.classList.contains(className)) {
          this.renderer.addClass(item.nativeElement, className);
        }
      } else {
        this.renderer.removeClass(item.nativeElement, className);
      }
    });
  }

}
