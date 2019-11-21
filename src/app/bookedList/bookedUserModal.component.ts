import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-bookedUserModal',
  templateUrl: 'bookedUserModal.component.html',
})
export class BookedUserModalComponent {

  
  constructor(
    public dialogRef: MatDialogRef<BookedUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  

}