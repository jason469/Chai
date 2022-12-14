import {Component, Input, OnInit} from '@angular/core';
import {ICommandmentData} from "../../../../shared/interfaces/ICommandmentData";
import {clickCommandmentsAnimation} from "./commandment-item.animation";

@Component({
  selector: 'app-commandment-item',
  templateUrl: './commandment-item.component.html',
  styleUrls: ['./commandment-item.component.scss'],
  animations: [
    clickCommandmentsAnimation,
  ]
})
export class CommandmentItemComponent implements OnInit {
  @Input('commandmentData') data!: ICommandmentData;
  @Input() index !:number
  clicked: string = 'false';

  constructor() { }

  ngOnInit(): void {
  }

  toggleClicked() {
    this.clicked = this.clicked === 'true' ? 'false' : 'true'; // change in data-bound value
  }

}
