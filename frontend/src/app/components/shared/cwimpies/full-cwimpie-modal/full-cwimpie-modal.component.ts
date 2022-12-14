import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {CwimpieModalDataService} from "../../../../services/cwimpies/cwimpieModalData.service";
import {Subscription} from "rxjs";
import {Cwimpie} from "../../../../shared/models/models";
import {IStampData} from "../../../../shared/interfaces/IStampData";
import {dateFormat} from "../../../../shared/constants/dateTimeFormats";

@Component({
  selector: 'app-full-cwimpie-modal',
  templateUrl: './full-cwimpie-modal.component.html',
  styleUrls: ['./full-cwimpie-modal.component.scss']
})
export class FullCwimpieModalComponent implements OnInit, OnDestroy {
  @Input('cwimpieData') public modalRef!: BsModalRef;
  cwimpieModalDataServiceSubscription!: Subscription
  data!: Cwimpie;
  birthDateString!: string;
  stampData!: IStampData

  constructor(
    private cwimpieModalDataService: CwimpieModalDataService,
  ) {
  }

  ngOnInit(): void {
    this.cwimpieModalDataServiceSubscription = this.cwimpieModalDataService.getData().subscribe({
      next: (data:Cwimpie) => {
        this.data = data
        if (this.data.birthdate) {
          this.birthDateString = new Date(this.data.birthdate).toLocaleDateString('en-US', dateFormat)
        }
        this.stampData = {
          name: data.name,
          primaryColour: data.stamp!.primary_colour!.hexCode!,
          accentColour: data.stamp!.accent_colour!.hexCode!,
          font: data.stamp!.font!,
          speciesName: data.species!.name
        }
      }
    });
  }

  ngOnDestroy(): void {
    if (this.cwimpieModalDataServiceSubscription) {
      this.cwimpieModalDataServiceSubscription.unsubscribe()
    }
  }
}
