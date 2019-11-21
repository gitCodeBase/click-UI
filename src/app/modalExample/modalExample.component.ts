import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { State, City } from 'src/models/request-criteria/state';
import { CommonDataService } from '../service/common-data.service';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-modalExample',
  templateUrl: 'modalExample.component.html',
})
export class ModalExampleComponent {

  cities: City[];

  constructor(
    public dialogRef: MatDialogRef<ModalExampleComponent>,  private commonDataService: CommonDataService,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  populateCity(value: State) {
    this.commonDataService.StateId = value.id;
    this.commonDataService.retrieveCities(value.id).subscribe(city =>{
      this.cities = this.commonDataService.Cities;
      this.onNoClick();
      let dialogRef = this.dialog.open(ModalExampleComponent, {
        width: '350px',
        data: {  cities: this.cities }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        
      });
    })
  }

  openDialog(): void {

     
    
  
     
  
     
    }

}