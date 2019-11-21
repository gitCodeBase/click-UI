import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-notificationModal',
  templateUrl: 'notificationModal.component.html',
})
export class NotificationModalComponent {

  constructor(
    public dialogRef: MatDialogRef<NotificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  
}