import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ScheduleRoutingModule} from './schedule-routing.module';
import {ScheduleComponent} from './schedule.component';
import {DailyScheduleCardComponent} from "../../shared/dailySchedule/daily-schedule-card/daily-schedule-card.component";


@NgModule({
  declarations: [
    ScheduleComponent,
    DailyScheduleCardComponent,
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule
  ]
})
export class ScheduleModule {
}
