import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog } from '@angular/material';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-itemDetailsModal',
  templateUrl: 'itemDetailsModal.component.html',
})
export class ItemDetailsModalComponent implements OnInit {

  itemReviewForm: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<ItemDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog,
    private _formBuilder: FormBuilder) { }

    ngOnInit() {
      this.itemReviewForm = this._formBuilder.group({
        rating: '',
        heading: '',
        comment: ''
      });
    }

    onRate(value: string) {
      alert('aaaaaaaa');
      var kk = value;
    }

    onSubmit(): void {
      var kk = this.itemReviewForm.controls['heading'].value;
      this.dialogRef.close();
    }

  

}