import {Component, Input, OnInit} from '@angular/core';
import {Cwimpie} from "../../../../shared/models/models";
import {dateFormat} from "../../../../shared/constants/dateTimeFormats";

@Component({
  selector: 'app-daily-schedule-card',
  templateUrl: './daily-schedule-card.component.html',
  styleUrls: ['./daily-schedule-card.component.scss']
})
export class DailyScheduleCardComponent implements OnInit {
  @Input('cwimpieSchedule') data!: Cwimpie;

  currentDateString!: string

  constructor() { }

  ngOnInit(): void {
    this.currentDateString = new Date(this.data.dailyScheduleId![0].date!).toLocaleDateString('en-US', dateFormat)
  }

}
