import {Component, OnInit} from '@angular/core';
import {routeAnimation} from "../../../route-animations.animation";
import {prepareRoute} from "../../../shared/constants/animations";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-cwimpies',
  templateUrl: './cwimpies.component.html',
  styleUrls: ['./cwimpies.component.scss'],
  animations: [
    routeAnimation
  ]
})
export class CwimpiesComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

  prepareRoute(outlet: RouterOutlet) {
    return prepareRoute(outlet)
  }
}
