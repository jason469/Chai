import {Component, OnDestroy, OnInit} from '@angular/core';
import {ViewCwimpiesService} from "../../../../../services/cwimpies/viewCwimpies.service";
import {Subscription} from "rxjs";
import {IReducedCwimpieCardData} from "../../../../../shared/interfaces/IReducedCwimpieCardData";

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss'],
  providers: []
})
export class ViewAllComponent implements OnInit, OnDestroy {
  loading: boolean = true
  private getAllCwimpiesSub: Subscription | undefined;
  allCwimpies: IReducedCwimpieCardData[] = [];

  constructor(
    private viewCwimpiesService: ViewCwimpiesService
  ) {
  }

  ngOnInit(): void {
    this.viewCwimpiesService.getAllCwimpiesData().subscribe(allData => {
      for (let data of allData) {
        let cwimpieData:IReducedCwimpieCardData = {
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
      }
      this.loading = false;
    })
  }

  ngOnDestroy() {
    if (this.getAllCwimpiesSub) {
      this.getAllCwimpiesSub.unsubscribe()
    }
  }

}
