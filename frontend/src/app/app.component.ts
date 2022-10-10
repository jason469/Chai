import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Chai';

  constructor(updates: SwUpdate,
              private authService: AuthService) {
    updates.versionUpdates.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload())
    })
  }

  ngOnInit() {
    console.log('restarted')
    this.authService.autoLogin()
  }
}
