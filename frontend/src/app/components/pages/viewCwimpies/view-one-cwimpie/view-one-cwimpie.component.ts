import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-view-one-cwimpie',
  templateUrl: './view-one-cwimpie.component.html',
  styleUrls: ['./view-one-cwimpie.component.scss']
})
export class ViewOneCwimpieComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.bunnyId = this.route.snapshot.params['id']
    // this.route.params
    //   .subscribe(
    //     () => {
    //       (params: Params) => {
    //         this.bunnyId = params['id'];
    //       }
    //     }
    //   )
  }

  ngOnDestroy() {
    // this.paramsSubscription.unsubscribe();
  }

}
