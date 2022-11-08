import {Component, OnDestroy, OnInit} from '@angular/core';
import {ViewCwimpiesService} from "../../../../../services/cwimpies/viewCwimpies.service";
import {Subscription} from "rxjs";
import {ICwimpieCardData} from "../../../../../shared/interfaces/ICwimpieCardData";

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss'],
  providers: []
})
export class ViewAllComponent implements OnInit, OnDestroy {
  loading: boolean = true
  private getAllCwimpiesSub: Subscription | undefined;
  allCwimpies: ICwimpieCardData[] = [];

  constructor(
    private viewCwimpiesService: ViewCwimpiesService
  ) {
  }

  ngOnInit(): void {
    this.viewCwimpiesService.getAllCwimpiesData().subscribe(allData => {
      if (allData.length != 0) {
        for (let data of allData) {
          let cwimpieData: ICwimpieCardData = {
            cwimpieId: data._id,
            name: data.name,
            birthdate: data.birthdate,
            colour: data.colour_id,
            species: data.species_id,
            favourites: data.favourites,
            professions: data.professions,
            hobbies: data.hobbies,
            primaryParent: data.primaryParent_id
          }
          this.allCwimpies.push(cwimpieData)
          console.log(cwimpieData)
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
