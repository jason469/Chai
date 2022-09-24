import {Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Chai';

  constructor(updates: SwUpdate) {
    updates.versionUpdates.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload())
    })
  }
}
