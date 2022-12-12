import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-cwimpie-dialog',
  templateUrl: './delete-cwimpie-dialog.component.html',
  styleUrls: ['./delete-cwimpie-dialog.component.scss']
})
export class DeleteCwimpieDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteCwimpieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
