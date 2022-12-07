import {Component, OnDestroy, OnInit} from '@angular/core';
import {ViewCwimpiesService} from "../../../../../services/cwimpies/viewCwimpies.service";
import {Subscription} from "rxjs";
import {Cwimpie} from "../../../../../shared/models/models";

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss'],
  providers: []
})
export class ViewAllComponent implements OnInit, OnDestroy {
  loading: boolean = true
  private getAllCwimpiesSub: Subscription | undefined;
  allCwimpies: Cwimpie[] = [];
  currentCwimpies: Cwimpie[] = [];

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
    private viewCwimpiesService: ViewCwimpiesService
  ) {
  }

  filterCwimpies(event: any) {
    console.log(event)
    console.log(this.currentCwimpies[0].primaryParent)
    switch (event.filterValue) {
      case "all":
        this.currentCwimpies = this.allCwimpies.filter((cwimpie:Cwimpie) => cwimpie );
        break
      case "jason":
      case "sue":
        this.currentCwimpies = this.allCwimpies.filter((cwimpie:Cwimpie) => cwimpie.primaryParent!.username == event.filterValue);
    }


  }

  ngOnInit(): void {
    this.getAllCwimpiesSub = this.viewCwimpiesService.getAllCwimpiesData().subscribe(allData => {
      if (allData.length != 0) {
        for (let data of allData) {
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
          this.allCwimpies.push(cwimpieData)
          this.currentCwimpies.push(cwimpieData)
        }
      }

      this.loading = false;
    })
  }

  refreshAllCwimpies(deleteCwimpieName: string) {
    let deletedCwimpieIndex = this.allCwimpies.map(object => object.name).indexOf(deleteCwimpieName)
    this.currentCwimpies.splice(deletedCwimpieIndex, 1);
  }

  ngOnDestroy() {
    if (this.getAllCwimpiesSub) {
      this.getAllCwimpiesSub.unsubscribe()
    }
  }

}
