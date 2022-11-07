import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {CwimpieModalDataService} from "../../../../services/cwimpies/cwimpieModalData.service";
import {Subscription} from "rxjs";
import {ICwimpieCardData} from "../../../../shared/interfaces/ICwimpieCardData";

@Component({
  selector: 'app-full-cwimpie-modal',
  templateUrl: './full-cwimpie-modal.component.html',
  styleUrls: ['./full-cwimpie-modal.component.css']
})
export class FullCwimpieModalComponent implements OnInit, OnDestroy {
  data!: ICwimpieCardData;
  @Input('cwimpieData') public modalRef!: BsModalRef;
  cwimpieModalDataServiceSubscription!: Subscription


  constructor(
    private cwimpieModalDataService: CwimpieModalDataService,
    private modalService: BsModalService
  ) {
  }

  ngOnInit(): void {
    this.cwimpieModalDataServiceSubscription = this.cwimpieModalDataService.getData().subscribe({
      next: (data:ICwimpieCardData) => {
        console.log('subscription')
        console.log(data)
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
      console.log('unsubscribe')
    }
  }
}
