import {Component, OnInit} from '@angular/core';
import {Cwimpie} from "../../../shared/models/models";
import {ViewCwimpiesService} from "../../../services/cwimpies/viewCwimpies.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  allCwimpies: Cwimpie[] = [];
  loading: boolean = true

  constructor(
    private viewCwimpiesService: ViewCwimpiesService
  ) {
  }

  ngOnInit(): void {
    this.viewCwimpiesService.getAllCwimpiesData().subscribe(allData => {
      if (allData.length != 0) {
        for (let data of allData) {
          console.log(data.dailyScheduleId)
          let cwimpieData: Cwimpie = {
            name: data.name,
            dailyScheduleId: data.dailyScheduleId,
            professions: data.professions,
            hobbies: data.hobbies,
            photo: data.photo
          }
          this.allCwimpies.push(cwimpieData)
        }
      }
      this.loading = false;
    })
  }

}
