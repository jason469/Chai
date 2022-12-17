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
      title: 'Age',
      rule: 'No male cwimpie can be younger than their partner',
      icon: 'plus'
    },
    {
      title: 'Eggplant',
      rule: 'All cwimpies must supa like eggplant',
      icon: 'utensils'
    },
    {
      title: 'Defense',
      rule: 'All cwimpies must defend mummy and be on her side !!',
      icon: 'shield-halved'
    },
    {
      title: 'Announcements',
      rule: 'All cwimpies must be awake when mummy is making announcements',
      sub_rule: 'Optional for daddy\'s announcements',
      icon: 'bullhorn'
    },
    {
      title: 'Toots',
      rule: 'All cwimpies must deny that mummy\'s tooted ',
      sub_rule: 'Optional for daddy\'s toots',
      icon: 'wind'
    },
    {
      title: 'Bed',
      rule: 'All cwimpies must stay in bed to stay nice and clean ',
      icon: 'bed'
    },
  ];


}
