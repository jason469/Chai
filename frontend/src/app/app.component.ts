import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {AuthService} from "./services/auth/auth.service";
import {Subscription} from "rxjs";
import {ChildrenOutletContexts, RouterOutlet} from "@angular/router";
import {slider} from "./route-animations";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    // fader,
    slider,
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Chai';
  private autoLoginSub: Subscription | undefined;

  constructor(updates: SwUpdate,
              private authService: AuthService,
              private contexts: ChildrenOutletContexts
  ) {
    updates.versionUpdates.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload())
    })
  }

  ngOnInit() {
    this.authService.autoLogin()?.subscribe()
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  ngOnDestroy() {
    if (this.autoLoginSub) {
      this.autoLoginSub?.unsubscribe()
    }
  }
}
