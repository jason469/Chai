import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-legend-menu',
  templateUrl: './legend-menu.component.html',
  styleUrls: ['./legend-menu.component.scss']
})
export class LegendMenuComponent implements OnInit {
  @Input() map: any
  @Input() layerIds: string[] = []

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.map)
  }

  toggleItem(event: any) {
    console.log(event)
    const visibilityStatus = (event.viewStatus) ? 'visible' : 'none';
    for (let layerId of this.layerIds) {
      if (layerId.startsWith(event.prefix)) {
        this.map.setLayoutProperty(layerId, 'visibility', visibilityStatus)
      }
    }
  }

}
