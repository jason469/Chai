import {Component, ElementRef, HostBinding, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {IStampData} from "../../../../shared/interfaces/IStampData";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-cwimpie-stamp',
  templateUrl: './cwimpie-stamp.component.html',
  styleUrls: ['./cwimpie-stamp.component.css']
})
export class CwimpieStampComponent implements OnInit {
  @Input('stampData') data!: IStampData
  @ViewChild('stamp') private stampContainer!: ElementRef;

  constructor(
    private renderer: Renderer2,
    private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.renderer.setProperty(
      this.stampContainer.nativeElement, 'style', `
      --primaryColour: ${this.data.primaryColour};
      --accentColour: ${this.data.accentColour};
      --font: ${this.data.font};
      `
    )
  }

}
