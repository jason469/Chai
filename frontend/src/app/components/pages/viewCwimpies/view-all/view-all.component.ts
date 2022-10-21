import {Component, OnDestroy, OnInit} from '@angular/core';
import {ViewCwimpiesService} from "../../../../services/viewCwimpies/viewCwimpies.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-view-all',
  templateUrl: './view-all.component.html',
  styleUrls: ['./view-all.component.scss']
})
export class ViewAllComponent implements OnInit, OnDestroy {
  private getAllCwimpiesSub: Subscription | undefined;

  constructor(
    private viewCwimpiesService: ViewCwimpiesService
  ) {
  }

  ngOnInit(): void {
    this.viewCwimpiesService.getAllCwimpiesData().subscribe()
  }

  ngOnDestroy() {
    if (this.getAllCwimpiesSub) {
      this.getAllCwimpiesSub.unsubscribe()
    }
  }

}
