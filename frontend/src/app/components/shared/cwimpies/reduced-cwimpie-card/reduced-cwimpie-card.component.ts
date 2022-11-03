import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IReducedCwimpieCardData} from "../../../../shared/interfaces/IReducedCwimpieCardData";
import {MatDialog} from '@angular/material/dialog';
import {FullCwimpieModalComponent} from "../full-cwimpie-modal/full-cwimpie-modal.component";
import {ViewCwimpiesService} from "../../../../services/cwimpies/viewCwimpies.service";
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-reduced-cwimpie-card',
  templateUrl: './reduced-cwimpie-card.component.html',
  styleUrls: ['./reduced-cwimpie-card.component.css']
})
export class ReducedCwimpieCardComponent implements OnInit {
  @Input('cwimpieData') data: IReducedCwimpieCardData|null = null;
  @Output() deletedCwimpieName: EventEmitter<string> =   new EventEmitter();

  constructor(
    public cwimpieModal: MatDialog,
    private viewCwimpiesService: ViewCwimpiesService,
    @Inject(DOCUMENT) private document: Document
  ) { }

  openCwimpieModal(): void {
    const dialogRef = this.cwimpieModal.open(FullCwimpieModalComponent, {
      width: '250px',
      data: this.data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  deleteCwimpie(name:string): void {
    console.log(`deleting ${name}`)
    this.viewCwimpiesService.deleteCwimpie(name).subscribe(response => {
      this.deletedCwimpieName.emit(name)
    })
  }

  ngOnInit(): void {
  }

}
