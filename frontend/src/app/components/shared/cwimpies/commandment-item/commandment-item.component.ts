import {Component, Input, OnInit} from '@angular/core';
import {ICommandmentData} from "../../../../shared/interfaces/ICommandmentData";
import {clickCommandmentsAnimation} from "./commandment-item.animation";
import {ToastrService} from "ngx-toastr";

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

  constructor(
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  toggleClicked() {
    this.clicked = this.clicked === 'true' ? 'false' : 'true'; // change in data-bound value

    if (this.clicked == 'true') {
      this.toastrService.success(
        `The commandment ${this.data.title} has been marked as read`
      );
    } else {
      this.toastrService.error(
        `The commandment ${this.data.title} has been marked as unread`
      );
    }
  }

}
