import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {CwimpieModalDataService} from "../../../../services/cwimpies/cwimpieModalData.service";
import {Subscription} from "rxjs";
import {Cwimpie} from "../../../../shared/models/models";

@Component({
  selector: 'app-full-cwimpie-modal',
  templateUrl: './full-cwimpie-modal.component.html',
  styleUrls: ['./full-cwimpie-modal.component.css']
})
export class FullCwimpieModalComponent implements OnInit, OnDestroy {
  data!: Cwimpie;
  @Input('cwimpieData') public modalRef!: BsModalRef;
  cwimpieModalDataServiceSubscription!: Subscription


  constructor(
    private cwimpieModalDataService: CwimpieModalDataService,
  ) {
  }

  ngOnInit(): void {
    this.cwimpieModalDataServiceSubscription = this.cwimpieModalDataService.getData().subscribe({
      next: (data:Cwimpie) => {
        this.data = data
      }
    });
  }

  ngOnChanges(changes: any) {
    console.log(changes)
  }

  ngOnDestroy(): void {
    if (this.cwimpieModalDataServiceSubscription) {
      this.cwimpieModalDataServiceSubscription.unsubscribe()
    }
  }
}
