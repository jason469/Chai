import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {ICwimpieCardData} from "../../../../shared/interfaces/ICwimpieCardData";
import {FullCwimpieModalComponent} from "../full-cwimpie-modal/full-cwimpie-modal.component";
import {ViewCwimpiesService} from "../../../../services/cwimpies/viewCwimpies.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CwimpieModalDataService} from "../../../../services/cwimpies/cwimpieModalData.service";

@Component({
  selector: 'app-reduced-cwimpie-card',
  templateUrl: './reduced-cwimpie-card.component.html',
  styleUrls: ['./reduced-cwimpie-card.component.css']
})
export class ReducedCwimpieCardComponent implements OnInit {
  @Input('cwimpieData') data!: ICwimpieCardData;
  @Output() deletedCwimpieName: EventEmitter<string> = new EventEmitter();
  modalRef!: BsModalRef

  constructor(
    private viewCwimpiesService: ViewCwimpiesService,
    private cwimpieModalDataService: CwimpieModalDataService,
    private modalService: BsModalService,
  ) {
  }

  public openCwimpieModal(): void {
    this.cwimpieModalDataService.changeData(this.data)
    this.modalRef = this.modalService.show(FullCwimpieModalComponent)
  }

  deleteCwimpie(name: string): void {
    console.log(`deleting ${name}`)
    this.viewCwimpiesService.deleteCwimpie(name).subscribe(response => {
      this.deletedCwimpieName.emit(name)
    })
  }

  ngOnInit(): void {
  }

}
