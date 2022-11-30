import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {FullCwimpieModalComponent} from "../full-cwimpie-modal/full-cwimpie-modal.component";
import {ViewCwimpiesService} from "../../../../services/cwimpies/viewCwimpies.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CwimpieModalDataService} from "../../../../services/cwimpies/cwimpieModalData.service";
import {CwimpieUpdateDataService} from "../../../../services/cwimpies/cwimpieUpdateData.service";
import {UpdateCwimpiesComponent} from "../../../forms/cwimpies/update-cwimpies/update-cwimpies.component";
import {Cwimpie} from "../../../../shared/models/models";
import {UpdateCwimpieCardService} from "../../../../services/cwimpies/updateCwimpieCard.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reduced-cwimpie-card',
  templateUrl: './reduced-cwimpie-card.component.html',
  styleUrls: ['./reduced-cwimpie-card.component.css']
})
export class ReducedCwimpieCardComponent implements OnInit, OnDestroy {
  @Input('cwimpieData') data!: Cwimpie;
  @Output() deletedCwimpieName: EventEmitter<string> = new EventEmitter();
  modalRef!: BsModalRef
  updateCwimpieCardServiceSubscription!: Subscription
  initialData!: any

  constructor(
    private viewCwimpiesService: ViewCwimpiesService,
    private cwimpieModalDataService: CwimpieModalDataService,
    private cwimpieUpdateDataService: CwimpieUpdateDataService,
    private modalService: BsModalService,
    private updateCwimpieCardService: UpdateCwimpieCardService,
    private router: Router
  ) {
  }

  public openCwimpieModal(): void {
    this.cwimpieModalDataService.changeData(this.data)
    this.modalRef = this.modalService.show(FullCwimpieModalComponent)
  }

  public updateCwimpieModal(): void {
    let updateCwimpieData: Cwimpie = {
      birthdate: this.initialData.birthdate!,
      colour: {
        name: this.initialData.colour!.name
      },
      favourites: this.initialData.favourites!,
      hobbies: this.initialData.hobbies!,
      name: this.initialData.name,
      sex: this.initialData.sex,
      partner: this.initialData.partner,
      photo: this.initialData.photo,
      primaryParent: {
        name: this.initialData.primaryParent!.name
      },
      professions: this.initialData.professions,
      species: {
        name: this.initialData.species!.name
      },
      stamp: {
        primary_colour: {
          name: this.initialData.stamp!.primary_colour!.name
        },
        accent_colour: {
          name: this.initialData.stamp!.accent_colour!.name
        },
        font: this.initialData.stamp!.font,
      }
    }
    this.cwimpieUpdateDataService.changeData(updateCwimpieData)
    this.modalRef = this.modalService.show(UpdateCwimpiesComponent)
  }

  deleteCwimpie(name: string): void {
    console.log(`deleting ${name}`)
    this.viewCwimpiesService.deleteCwimpie(name).subscribe(response => {
        this.deletedCwimpieName.emit(name)
      }
    )
  }

  ngOnInit(): void {
    this.initialData = this.data
    this.updateCwimpieCardService.changeState("")
    this.updateCwimpieCardServiceSubscription = this.updateCwimpieCardService.getState().subscribe((res) => {
      if (this.data.name == res) {
        let updatedCwimpieDataSubscription = this.viewCwimpiesService.getCwimpie(res).subscribe(response => {
          console.log(response)
          this.initialData = response
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        })
        updatedCwimpieDataSubscription.unsubscribe()
      }
    })
  }

  ngOnDestroy() {
    if (this.updateCwimpieCardServiceSubscription) {
      this.updateCwimpieCardServiceSubscription.unsubscribe()
    }
  }
}
