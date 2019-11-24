/*import { Component, OnInit, Input, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CommonDataService } from '../service/common-data.service';
import { ModalService } from '../service/modal.service';

import { MatDialog } from '@angular/material';
import { ModalExampleComponent } from '../modalExample/modalExample.component';
import { State } from 'src/models/request-criteria/state';

@Component({
  selector: 'app-showExample',
  templateUrl: './showExample.component.html',
  styleUrls: ['./showExample.component.css']
})
export class ShowExampleComponent {

  loginForm: FormGroup;
  submitted: boolean = false;
  value1: string;
  value2: string;

  animal: string;
  name: string;

  private states: State[];
  private xyz: string;
  private statesList: string[];

  constructor(
  public dialog: MatDialog, private commonDataService: CommonDataService) { }



openDialog(): void {

  this.commonDataService.retrieveStates().subscribe(state =>{
    this.states = this.commonDataService.StatesList;

    let dialogRef = this.dialog.open(ModalExampleComponent, {
      width: '350px',
      data: { name: this.name, animal: this.animal, states: this.states }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  })

   

   
  }
}*/