import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {IReducedCwimpieCardData} from "../../../../shared/interfaces/IReducedCwimpieCardData";

@Component({
  selector: 'app-full-cwimpie-modal',
  templateUrl: './full-cwimpie-modal.component.html',
  styleUrls: ['./full-cwimpie-modal.component.css']
})
export class FullCwimpieModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FullCwimpieModalComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: IReducedCwimpieCardData
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

}
