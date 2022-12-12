import { Component, OnInit } from '@angular/core';
import {loadCommandmentsAnimation} from "./commandments.animation";

@Component({
  selector: 'app-commandments',
  templateUrl: './commandments.component.html',
  styleUrls: ['./commandments.component.scss'],
  animations: [
    loadCommandmentsAnimation,
  ]
})
export class CommandmentsComponent implements OnInit {
  isLoading:boolean = true;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.isLoading = false, 200)
  }

  public commandments: any = [
    {
      rule: 'No male cwimpie can be younger than their partner',
    },
    {
      rule: 'All cwimpies must supa like eggplant',
    },
    {
      rule: 'All cwimpies must defend mummy and be on her side !!',
    },
    {
      rule: 'All cwimpies must be awake when mummy is making announcements',
      sub_rule: 'Optional for daddy\'s announcements'
    },
    {
      rule: 'All cwimpies must deny that mummy\'s tooted ',
      sub_rule: 'Optional for daddy\'s toots'
    },
  ];


}
