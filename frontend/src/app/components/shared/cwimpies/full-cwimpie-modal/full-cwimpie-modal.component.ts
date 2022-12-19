import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
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
  @ViewChild('modal') private modalContainer!: ElementRef;

  cwimpieModalDataServiceSubscription!: Subscription
  data!: Cwimpie;
  stampData!: IStampData
  birthDateString!: string;
  currentDateString!: string
  addressNumber!: number
  professionNamesString: string = ""  // String of cwimpie's professions
  hobbyNamesString: string = ""  // String of cwimpie's hobbies

  constructor(
    private cwimpieModalDataService: CwimpieModalDataService,
  ) {
  }

  constructListString(array:any) {
    let stringArray:string[] = []
    for (let value of array) {
      stringArray.push(' ' + value.name)
    }
    let stringCommas = stringArray.toString()
    return stringCommas.replace(/,(?=[^,]*$)/, " and") // Replace last comma with and
  }

  ngOnInit(): void {
    this.cwimpieModalDataServiceSubscription = this.cwimpieModalDataService.getData().subscribe({
      next: (data: Cwimpie) => {
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
    this.currentDateString = new Date().toLocaleDateString('en-US', dateFormat)
    this.addressNumber = Math.floor(Math.random() * (999 - 100 + 1) + 100)  // Random 3 digit number

    this.professionNamesString = this.constructListString(this.data.professions!)
    this.hobbyNamesString = this.constructListString(this.data.hobbies!)
  }

  ngOnDestroy(): void {
    if (this.cwimpieModalDataServiceSubscription) {
      this.cwimpieModalDataServiceSubscription.unsubscribe()
    }
  }
}
