import {Component, OnDestroy, OnInit} from '@angular/core';
import {ViewCwimpiesService} from "../../../../../services/cwimpies/viewCwimpies.service";
import {Subscription} from "rxjs";
import {Cwimpie} from "../../../../../shared/models/models";
import {listAnimation, tabAnimation} from "./view-all.animation";
import {ProfilePageService} from "../../../../../services/profile/profilePage.service";


@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss'],
  providers: [],
  animations: [
    tabAnimation,
    listAnimation,
  ]
})


export class ViewAllComponent implements OnInit, OnDestroy {
  loading: boolean = true
  private getAllCwimpiesSub: Subscription | undefined;
  allCwimpies: Cwimpie[] = [];

  public filterOptions: any = [
    {
      displayName: 'All',
      username: 'all'
    },
    {
      displayName: 'Jason',
      username: 'jason'
    },
    {
      displayName: 'Sue',
      username: 'sue'
    },
  ];

  constructor(
    private viewCwimpiesService: ViewCwimpiesService,
    private profilePageService: ProfilePageService
  ) {
  }

  constructCwimpieData(data: any) {
    let cwimpieData: Cwimpie = {
      cwimpieId: data._id,
      name: data.name,
      sex: data.sex,
      birthdate: data.birthdate,
      colour: data.colourId,
      species: data.speciesId,
      favourites: data.favourites,
      professions: data.professions,
      hobbies: data.hobbies,
      primaryParent: data.primaryParentId,
      stamp: data.stampId,
      photo: data.photo
    }
    if (data.partnerId) {
      cwimpieData.partner = data.partnerId.name
    }

    return cwimpieData
  }

  filterCwimpies(event: any) {
    const username = event.filterValue
    this.allCwimpies = []
    switch (username) {
      case "all":
        let getAllCwimpiesSub = this.viewCwimpiesService.getAllCwimpiesData().subscribe(allData => {
          if (allData.length != 0) {
            for (let data of allData) {
              let cwimpieData = this.constructCwimpieData(data)
              this.allCwimpies.push(cwimpieData)
            }
          }
        })
        break
      case "jason":
        let getCwimpiesJasonSub = this.profilePageService.getCwimpiesFromUser(username).subscribe(allData => {
          console.log(allData)
          if (allData.length != 0) {
            for (let data of allData) {
              console.log(data)
              let cwimpieData = this.constructCwimpieData(data)
              this.allCwimpies.push(cwimpieData)
            }
          }
          getCwimpiesJasonSub.unsubscribe()
        })
        console.log(this.allCwimpies)
        break
      case "sue":
        let getCwimpiesSueSub = this.profilePageService.getCwimpiesFromUser(username).subscribe(allData => {
          if (allData.length != 0) {
            for (let data of allData) {
              let cwimpieData = this.constructCwimpieData(data)
              this.allCwimpies.push(cwimpieData)
            }
          }
          getCwimpiesSueSub.unsubscribe()
        })
        break
    }
  }

  ngOnInit(): void {
    this.getAllCwimpiesSub = this.viewCwimpiesService.getAllCwimpiesData().subscribe(allData => {
      if (allData.length != 0) {
        for (let data of allData) {
          let cwimpieData = this.constructCwimpieData(data)
          this.allCwimpies.push(cwimpieData)
        }
      }
      this.loading = false;
    })
  }

  refreshAllCwimpies(deleteCwimpieName: string) {
    let deletedCwimpieIndex = this.allCwimpies.map(object => object.name).indexOf(deleteCwimpieName)
    this.allCwimpies.splice(deletedCwimpieIndex, 1);
  }

  ngOnDestroy() {
    if (this.getAllCwimpiesSub) {
      this.getAllCwimpiesSub.unsubscribe()
    }
  }
}
