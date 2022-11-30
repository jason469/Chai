import {Component, OnDestroy, OnInit} from '@angular/core';
import {StartPageService} from "../../../services/start/startPage.service";
import {Cwimpie} from "../../../shared/models/models";
import {Subscription} from "rxjs";
import {IBirthdayCwimpie} from "../../../shared/interfaces/IBirthdayCwimpie";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, OnDestroy {
  loading: boolean = true
  private getBirthdayCwimpiesSub: Subscription | undefined;
  allBirthdayCwimpies: IBirthdayCwimpie[] = [];

  constructor(
    private startPageService: StartPageService
  ) { }

  ngOnInit(): void {
    this.getBirthdayCwimpiesSub = this.startPageService.getBirthdayCwimpies().subscribe(response => {
      let data:any = response
      if (data.length != 0) {
        for (let birthdayCwimpieData of data) {
          let birthdayCwimpie:IBirthdayCwimpie = {
            name: birthdayCwimpieData.name,
            birthdate: birthdayCwimpieData.birthdate,
            photo: birthdayCwimpieData.photo,
            sex: birthdayCwimpieData.sex
          }
          this.allBirthdayCwimpies.push(birthdayCwimpie)
        }
      }
      this.loading = false
    })
  }

  ngOnDestroy(): void {
    if (this.getBirthdayCwimpiesSub) {
      this.getBirthdayCwimpiesSub.unsubscribe()
    }
  }

}
