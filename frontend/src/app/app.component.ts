import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {AuthService} from "./services/auth/auth.service";
import {Subscription} from "rxjs";
import {RouterOutlet} from "@angular/router";
import {routeAnimation} from "./route-animations.animation";
import {prepareRoute} from "./shared/constants/animations"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routeAnimation,
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Chai';
  private autoLoginSub: Subscription | undefined;

  constructor(updates: SwUpdate,
              private authService: AuthService,
  ) {
    updates.versionUpdates.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload())
    })
  }

  ngOnInit() {
    this.authService.autoLogin()?.subscribe()
  }

  prepareRoute(outlet: RouterOutlet) {
    return prepareRoute(outlet)
  }

  ngOnDestroy() {
    if (this.autoLoginSub) {
      this.autoLoginSub?.unsubscribe()
    }
  }
}
