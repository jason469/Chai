import {Component, OnDestroy, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {AuthService} from "./services/auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Chai';
  private autoLoginSub: Subscription | undefined;

  constructor(updates: SwUpdate,
              private authService: AuthService) {
    updates.versionUpdates.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload())
    })
  }

  ngOnInit() {
    this.authService.autoLogin()?.subscribe()
  }

  ngOnDestroy() {
    if (this.autoLoginSub) {
      this.autoLoginSub?.unsubscribe()
    }
  }
}
