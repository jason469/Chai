import {Component, Input, OnInit} from '@angular/core';
import {Cwimpie} from "../../../../shared/models/models";

@Component({
  selector: 'app-daily-schedule-card',
  templateUrl: './daily-schedule-card.component.html',
  styleUrls: ['./daily-schedule-card.component.scss']
})
export class DailyScheduleCardComponent implements OnInit {
  @Input('cwimpieSchedule') data!: Cwimpie;

  constructor() { }

  ngOnInit(): void {
  }

}
