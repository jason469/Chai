import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FullCwimpieModalComponent} from "../full-cwimpie-modal/full-cwimpie-modal.component";
import {ViewCwimpiesService} from "../../../../services/cwimpies/viewCwimpies.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CwimpieModalDataService} from "../../../../services/cwimpies/cwimpieModalData.service";
import {CwimpieUpdateDataService} from "../../../../services/cwimpies/cwimpieUpdateData.service";
import {UpdateCwimpiesComponent} from "../../../forms/cwimpies/update-cwimpies/update-cwimpies.component";
import {Cwimpie} from "../../../../shared/models/models";

@Component({
  selector: 'app-reduced-cwimpie-card',
  templateUrl: './reduced-cwimpie-card.component.html',
  styleUrls: ['./reduced-cwimpie-card.component.css']
})
export class ReducedCwimpieCardComponent implements OnInit {
  @Input('cwimpieData') data!: Cwimpie;
  @Output() deletedCwimpieName: EventEmitter<string> = new EventEmitter();
  modalRef!: BsModalRef

  constructor(
    private viewCwimpiesService: ViewCwimpiesService,
    private cwimpieModalDataService: CwimpieModalDataService,
    private cwimpieUpdateDataService: CwimpieUpdateDataService,
    private modalService: BsModalService,
  ) {
  }

  public openCwimpieModal(): void {
    this.cwimpieModalDataService.changeData(this.data)
    this.modalRef = this.modalService.show(FullCwimpieModalComponent)
  }

  public updateCwimpieModal(): void {
    let cwimpie = new Cwimpie()
    let getCwimpieSub = this.viewCwimpiesService.getCwimpie(this.data.name).subscribe((cwimpieData: any) => {
        console.log(cwimpieData)
        cwimpie.name = cwimpieData.name
        cwimpie.photo = cwimpieData.photo
        cwimpie.birthdate = cwimpieData.birthdate
        cwimpie.colour = cwimpieData.colour_id
        cwimpie.species = cwimpieData.species_id
        cwimpie.primaryParent = cwimpieData.primaryParent_id
        cwimpie.favourites = cwimpieData.favourites
        cwimpie.professions = cwimpieData.professions
        cwimpie.hobbies = cwimpieData.hobbies
        cwimpie.stamp = cwimpieData.stamp

        if (cwimpieData.partner_id) {
          cwimpie.partnerName = cwimpieData.partner_id.name
        }

        this.cwimpieUpdateDataService.changeData(cwimpie)
        this.modalRef = this.modalService.show(UpdateCwimpiesComponent)
        getCwimpieSub.unsubscribe()
      }
    )
  }

  deleteCwimpie(name: string): void {
    console.log(`deleting ${name}`)
    this.viewCwimpiesService.deleteCwimpie(name).subscribe(response => {
        this.deletedCwimpieName.emit(name)
      }
    )
  }

  ngOnInit(): void {
  }

}
