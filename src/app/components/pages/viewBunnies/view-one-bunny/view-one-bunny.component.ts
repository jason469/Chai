import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-view-one-bunny',
  templateUrl: './view-one-bunny.component.html',
  styleUrls: ['./view-one-bunny.component.scss']
})
export class ViewOneBunnyComponent implements OnInit, OnDestroy {
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
