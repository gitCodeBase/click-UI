import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonDataService } from '../service/common-data.service';
import { ModalService } from '../service/modal.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-landing',
  templateUrl: './landingPage.component.html',
  styleUrls: ['./landingPage.component.css']
})
export class LandingPageComponent implements OnInit, AfterViewInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  value1: string;
  value2: string;

  animal: string;
  name: string;

  private bodyText: string;
  private xyz: string;
  private statesList: string[];

  constructor(private commonDataService: CommonDataService,
    private router: Router, private modalService: ModalService, private ngxService: NgxUiLoaderService) { }

  categoryTiles1 = [
    {text: 'One', cols: 1, rows: 1, color: 'rgb(255)', image:'assets/images/1.jpg'},
    {text: 'Two', cols: 1, rows: 1, color: 'rgb(255)', image:'assets/images/weddingQuote_1.jpg'}
   ]

  categoryTiles2 = [
     {text: 'Three', cols: 1, rows: 2, color: 'rgb(255)', image:'assets/images/weddingQuote_2.jpg'},
    {text: 'Four', cols: 1, rows: 2, color: 'rgb(255)', image:'assets/images/2.jpg'}
  ]

  wordsTiles1 = [
    {text: '1', cols: 1, rows: 1, color: 'rgb(255)', quote:'jjjjjjjjjjjjj kkkkkkkkkkkkkkkkkkkkk ggggggggggggggggg'},
  ]

  wordsTiles2 = [
    {text: '2', cols: 1, rows: 1, color: 'rgb(255)', quote:'jjjjjjjjjjjjj kkkkkkkkkkkkkkkkkkkkk ggggggggggggggggg'},
  ]

  categoryTiles3 = [
    {text: 'Five', cols: 1, rows: 3, color: 'rgb(255)', image:'assets/images/3.jpg'},
    {text: 'Six', cols: 1, rows: 3, color: 'rgb(255)', image:'assets/images/weddingQuote_3.jpg'},
  ]

  wordsTiles3 = [
    {text: '3', cols: 1, rows: 1, color: 'rgb(255)', quote:'jjjjjjjjjjjjj kkkkkkkkkkkkkkkkkkkkk ggggggggggggggggg'},
  ]

  categoryTiles4 = [
    {text: 'Seven', cols: 1, rows: 4, color: 'rgb(255)', image:'assets/images/weddingQuote_4.jpg'},
    {text: 'Eight', cols: 1, rows: 4, color: 'rgb(255)', image:'assets/images/4.jpg'},
  ]

  wordsTiles4 = [
    {text: '4', cols: 1, rows: 1, color: 'rgb(255)', quote:'jjjjjjjjjjjjj kkkkkkkkkkkkkkkkkkkkk ggggggggggggggggg'},
  ]

  tiles2 = [
    {text: 'One', cols: 1, rows: 1, color: '#87ceeb', image:'assets/images/deal_1.jpg'},
    {text: 'Two', cols: 1, rows: 1, color: '#87ceeb', image:'assets/images/deal_2.jpg'},
    {text: 'Three', cols: 1, rows: 1, color: '#87ceeb', image:'assets/images/deal_1.jpg'}
    
  ]

  tiles3 = [
    {text: 'One', cols: 1, rows: 3, color: '#87ceeb', image:'assets/images/5.jpg', type:'Auditorium'},
    {text: 'Two', cols: 1, rows: 1, color: '#87ceeb', image:'assets/images/sadya_1.jpg', type:'Sadya'},
    {text: 'Three', cols: 1, rows: 1, color: '#87ceeb', image:'assets/images/beauty_1.jpg', type:'Beauty'},
    {text: 'Four', cols: 1, rows: 1, color: '#87ceeb', image:'assets/images/accomodation_1.jpg', type:'Acomodation'},
    {text: 'Five', cols: 1, rows: 3, color: '#87ceeb', image:'assets/images/transportation_1.jpg', type:'Transportation'},
    {text: 'six', cols: 3, rows: 2, color: '#87ceeb', image:'assets/images/words_1.jpg', type:''}
    
  ]
 
  redirectSearch(value: string) {
    this.ngxService.start();
    this.commonDataService.TypeSelected = value;
    this.router.navigate(['/search']);
  }

  retrieveCaters() {
    
  }

  retrieveVideo() {
    
  }

 

  ngOnInit() {
    this.ngxService.start();
    this.value1 = 'haiii';
    this.bodyText = 'This text can be updated in modal 2';
        this.xyz = 'new values';
  }
  newValue: string;
  
  ngAfterViewInit() {
    this.ngxService.stop();
  }

  openModal(id: string) {
    this.modalService.open(id);
}

closeModal(id: string) {
    this.modalService.close(id);
}

}
