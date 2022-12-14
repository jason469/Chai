import {Component, OnDestroy, OnInit} from '@angular/core';
import {StartPageService} from "../../../services/start/startPage.service";
import {Subscription} from "rxjs";
import {IBirthdayCwimpie} from "../../../shared/interfaces/IBirthdayCwimpie";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit, OnDestroy {
  isLoading: boolean = true
  private getBirthdayCwimpiesSub!: Subscription;
  allBirthdayCwimpies: IBirthdayCwimpie[] = [];

  constructor(
    private startPageService: StartPageService
  ) {
  }

  ngOnInit(): void {
    this.getBirthdayCwimpiesSub = this.startPageService.getBirthdayCwimpies().subscribe(response => {
        let data: any = response
        if (data.length != 0) {
          data.forEach((birthdayCwimpieData:any, index:number) => {
            let birthdayCwimpie: IBirthdayCwimpie = {
              name: birthdayCwimpieData.name,
              birthdate: birthdayCwimpieData.birthdate,
              photo: birthdayCwimpieData.photo,
              sex: birthdayCwimpieData.sex,
              index: index
            }
            this.allBirthdayCwimpies.push(birthdayCwimpie)
          })
        } else {
          this.allBirthdayCwimpies = []
        }
        this.isLoading = false
        console.log(this.allBirthdayCwimpies.length)
      }
    )
  }

  ngOnDestroy(): void {
    if (this.getBirthdayCwimpiesSub) {
      this.getBirthdayCwimpiesSub.unsubscribe()
    }
  }

  click() {
    console.log('clicked')
  }

}
