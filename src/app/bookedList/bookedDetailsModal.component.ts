import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-bookedDetailsModal',
  templateUrl: 'bookedDetailsModal.component.html',
})
export class BookedDetailsModalComponent {

  
  constructor(
    public dialogRef: MatDialogRef<BookedDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  

}