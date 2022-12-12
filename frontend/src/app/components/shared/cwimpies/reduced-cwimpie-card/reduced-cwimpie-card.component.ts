import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import {FullCwimpieModalComponent} from "../full-cwimpie-modal/full-cwimpie-modal.component";
import {ViewCwimpiesService} from "../../../../services/cwimpies/viewCwimpies.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {CwimpieModalDataService} from "../../../../services/cwimpies/cwimpieModalData.service";
import {CwimpieUpdateDataService} from "../../../../services/cwimpies/cwimpieUpdateData.service";
import {UpdateCwimpiesComponent} from "../../../forms/cwimpies/update-cwimpies/update-cwimpies.component";
import {Cwimpie} from "../../../../shared/models/models";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DeleteCwimpieDialogComponent} from "../delete-cwimpie-dialog/delete-cwimpie-dialog.component";

@Component({
  selector: 'app-reduced-cwimpie-card',
  templateUrl: './reduced-cwimpie-card.component.html',
  styleUrls: ['./reduced-cwimpie-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReducedCwimpieCardComponent implements OnInit {
  @Input('cwimpieData') data!: Cwimpie;
  @Output() deletedCwimpieName: EventEmitter<string> = new EventEmitter();
  @ViewChild('sex') private sexContainer!: ElementRef;
  modalRef!: BsModalRef
  initialData!: any

  constructor(
    private viewCwimpiesService: ViewCwimpiesService,
    private cwimpieModalDataService: CwimpieModalDataService,
    private cwimpieUpdateDataService: CwimpieUpdateDataService,
    private modalService: BsModalService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private el: ElementRef,
    public dialog: MatDialog
  ) {
  }

  public openCwimpieModal(): void {
    this.cwimpieModalDataService.changeData(this.initialData)
    this.modalRef = this.modalService.show(FullCwimpieModalComponent)
  }

  public openUpdateCwimpieModal(): void {
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
    this.modalRef.content.changedCwimpieName.subscribe((name: string) => {
      let updatedCwimpieDataSubscription = this.viewCwimpiesService.getCwimpie(name).subscribe(response => {
        let data: any = response
        let cwimpieData: Cwimpie = {
          cwimpieId: data._id,
          name: data.name,
          sex: data.sex,
          birthdate: data.birthdate,
          colour: data.colourId,
          species: data.speciesId,
          favourites: data.favourites,
          professions: data.professions,
          hobbies: data.hobbies,
          primaryParent: data.primaryParentId,
          stamp: data.stampId,
          photo: data.photo
        }
        if (data.partnerId) {
          cwimpieData.partner = data.partnerId.name
        }
        this.ngOnInit(cwimpieData)
        updatedCwimpieDataSubscription.unsubscribe()
        this.cdr.detectChanges();
      })
    });
  }

  deleteCwimpie(name: string): void {
    this.viewCwimpiesService.deleteCwimpie(name).subscribe(response => {
        this.deletedCwimpieName.emit(name)
      }
    )
  }

  openDialog(name: string): void {
    const dialogRef = this.dialog.open(DeleteCwimpieDialogComponent, {
      data: {name: name},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result)
      let deleteCwimpieName = result;
      if (deleteCwimpieName) {
        this.viewCwimpiesService.deleteCwimpie(deleteCwimpieName).subscribe(response => {
            this.deletedCwimpieName.emit(deleteCwimpieName)
          }
        )
      }
    });
  }

  ngOnInit(cwimpieData?: Cwimpie): void {
    if (cwimpieData) {
      this.renderer.removeChild(this.el.nativeElement, this.sexContainer.nativeElement)
      this.initialData = cwimpieData
    } else {
      this.initialData = this.data
    }
  }
}
