import {Component, Input, OnInit} from '@angular/core';
import {IReducedCwimpieCardData} from "../../../../shared/interfaces/IReducedCwimpieCardData";
import {MatDialog} from '@angular/material/dialog';
import {FullCwimpieModalComponent} from "../full-cwimpie-modal/full-cwimpie-modal.component";

@Component({
  selector: 'app-reduced-cwimpie-card',
  templateUrl: './reduced-cwimpie-card.component.html',
  styleUrls: ['./reduced-cwimpie-card.component.css']
})
export class ReducedCwimpieCardComponent implements OnInit {
  @Input('cwimpieData') data: IReducedCwimpieCardData|null = null;

  constructor(
    public cwimpieModal: MatDialog
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

  ngOnInit(): void {
  }

}
