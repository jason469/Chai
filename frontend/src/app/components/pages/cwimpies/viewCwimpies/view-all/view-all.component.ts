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

  constructor(
    private viewCwimpiesService: ViewCwimpiesService
  ) {
  }

  ngOnInit(): void {
    this.viewCwimpiesService.getAllCwimpiesData().subscribe(allData => {
      if (allData.length != 0) {
        for (let data of allData) {
          let cwimpieData: Cwimpie = {
            cwimpieId: data._id,
            name: data.name,
            birthdate: data.birthdate,
            colour: data.colourId,
            species: data.speciesId,
            favourites: data.favourites,
            professions: data.professions,
            hobbies: data.hobbies,
            primaryParent: data.primaryParentId,
            stamp: data.stampId,
          }
          if (data.partnerId) {
            cwimpieData.partnerName = data.partnerId.name
          }
          this.allCwimpies.push(cwimpieData)
        }
      }
      this.loading = false;
    })
  }

  refreshAllCwimpies(deleteCwimpieName:string) {
    let deletedCwimpieIndex = this.allCwimpies.map(object => object.name).indexOf(deleteCwimpieName)
    this.allCwimpies.splice(deletedCwimpieIndex, 1);
  }

  ngOnDestroy() {
    if (this.getAllCwimpiesSub) {
      this.getAllCwimpiesSub.unsubscribe()
    }
  }

}
