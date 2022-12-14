import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ScheduleRoutingModule} from './schedule-routing.module';
import {ScheduleComponent} from './schedule.component';
import {DailyScheduleCardComponent} from "../../shared/dailySchedule/daily-schedule-card/daily-schedule-card.component";
import {MdbAccordionModule} from "mdb-angular-ui-kit/accordion";
import {TaskCardComponent} from "../../shared/dailySchedule/task-card/task-card.component";


@NgModule({
  declarations: [
    ScheduleComponent,
    DailyScheduleCardComponent,
    TaskCardComponent,
  ],
    imports: [
        CommonModule,
        ScheduleRoutingModule,
        MdbAccordionModule
    ]
})
export class ScheduleModule {
}
