import {Component, EventEmitter, Input, OnInit, Output, Renderer2} from '@angular/core';

@Component({
  selector: 'app-hamburger-close',
  templateUrl: './hamburger-close.component.html',
  styleUrls: ['./hamburger-close.component.scss']
})
export class HamburgerCloseComponent implements OnInit {
  @Input('buttonControl') aria_control!:string;
  @Input('initialVisibleState') initialVisibleState!: boolean;  // Flag to see whether the item your hamburger icon is connected to should be toggled
  @Output() itemVisibleEvent: EventEmitter<boolean> = new EventEmitter();

  itemVisible!: boolean;  // Flag to see whether the item your hamburger icon is connected to should be toggled

  constructor(
  ) { }

  toggleItem() {
    this.itemVisible = !this.itemVisible
    this.itemVisibleEvent.emit(this.itemVisible)
  }

  ngOnInit(): void {
    this.itemVisible = this.initialVisibleState
  }

}
