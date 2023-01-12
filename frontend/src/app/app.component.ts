import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {AuthService} from "./services/auth/auth.service";
import {Subscription} from "rxjs";
import {RouterOutlet} from "@angular/router";
import {routeAnimation} from "./route-animations.animation";
import {prepareRoute} from "./shared/constants/animations"
import {HeaderVisibilityService} from "./services/partials/header/headerVisibility.service";

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
  private headerVisiblitySub: Subscription | undefined;

  navBarVisible:boolean = false

  constructor(updates: SwUpdate,
              private authService: AuthService,
              private headerVisibilityService: HeaderVisibilityService,
  ) {
    updates.versionUpdates.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload())
    })
  }

  ngOnInit() {
    this.authService.autoLogin()?.subscribe()
    this.headerVisiblitySub = this.headerVisibilityService.getData().subscribe({
      next: (data: boolean) => {
        this.navBarVisible = data
      }
    });

  }

  prepareRoute(outlet: RouterOutlet) {
    return prepareRoute(outlet)
  }

  ngOnDestroy() {
    if (this.autoLoginSub) {
      this.autoLoginSub?.unsubscribe()
    }
    if (this.headerVisiblitySub) {
      this.headerVisiblitySub.unsubscribe()
    }
  }
}
