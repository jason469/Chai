import {Component, Input, OnInit} from '@angular/core';
import {Cwimpie, DailySchedule} from "../../../../shared/models/models";
import {dateFormat} from "../../../../shared/constants/dateTimeFormats";

@Component({
  selector: 'app-daily-schedule-card',
  templateUrl: './daily-schedule-card.component.html',
  styleUrls: ['./daily-schedule-card.component.scss']
})
export class DailyScheduleCardComponent implements OnInit {
  @Input('cwimpieData') data!: Cwimpie;
  todayData!:DailySchedule  // Schedule data for today
  professionNames: string[] = []  // List of cwimpie's professions
  hobbyNames: string[] = []  // List of cwimpie's hobbies
  currentDateString: string = ''
  isLoading:boolean = true;

  constructor() {
  }

  ngOnInit(): void {
    if (this.data.dailyScheduleId != undefined && this.data.dailyScheduleId) {
      this.todayData = this.data.dailyScheduleId![this.data.dailyScheduleId.length - 1]
      console.log(this.todayData)
      this.currentDateString = new Date(this.todayData.date!).toLocaleDateString('en-US', dateFormat)

      for (let profession of this.data.professions!) {
        this.professionNames.push(' ' + profession.name)
      }

      for (let hobby of this.data.hobbies!) {
        this.hobbyNames.push(' ' + hobby.name)
      }
    }
    this.isLoading = false;
  }

}
