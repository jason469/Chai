import {Component, Input, OnInit} from '@angular/core';
import {IUserCwimpies} from "../../../../shared/interfaces/IUserCwimpies";

@Component({
  selector: 'app-profile-cwimpie-card',
  templateUrl: './profile-cwimpie-card.component.html',
  styleUrls: ['./profile-cwimpie-card.component.scss']
})
export class ProfileCwimpieCardComponent implements OnInit {
  @Input('cwimpieData') data!: IUserCwimpies;

  constructor() { }

  ngOnInit(): void {
  }

}
