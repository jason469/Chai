import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-legend-menu',
  templateUrl: './legend-menu.component.html',
  styleUrls: ['./legend-menu.component.scss']
})
export class LegendMenuComponent implements OnInit {
  @Input() map: any
  @Input() layerIds: string[] = []
  @Input() multiStopTrips: any[] = []

  HIDDEN_MULTI_STOP_TRIPS: any[] = ['all']

  constructor() {
  }

  ngOnInit(): void {
  }

  toggleItem(event: any) {
    const tripName = event.prefix
    const visibilityStatus = (event.viewStatus) ? 'visible' : 'none';
    if (event.isMultiStopItem) {
      if (visibilityStatus == 'visible') { // Want to show path
        for (let i = 0; i < this.HIDDEN_MULTI_STOP_TRIPS.length; i++) {
          if (this.HIDDEN_MULTI_STOP_TRIPS[i][2] == tripName) {
            this.HIDDEN_MULTI_STOP_TRIPS.splice(i, 1)
          }
        }
      } else {  // Want to hide path
        let new_filter = ['!=', 'tripName', tripName]
        this.HIDDEN_MULTI_STOP_TRIPS.push(new_filter)
      }
      this.map.setFilter('multi-stop-trip-path', this.HIDDEN_MULTI_STOP_TRIPS)
    } else {  // Not a multi-stop trip
      for (let layerId of this.layerIds) {
        if (layerId.startsWith(event.prefix)) {
          this.map.setLayoutProperty(layerId, 'visibility', visibilityStatus)
        }
      }
    }
  }

}
