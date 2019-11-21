import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonDataService } from '../service/common-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigationHeader',
  templateUrl: './navigationHeader.component.html',
  styleUrls: ['./navigationHeader.component.css']
})
export class NavigationHeaderComponent implements OnInit {

  userType:string;
  @Output() sidenavClose = new EventEmitter();

  constructor(private commonDataService: CommonDataService, private router: Router) { }

  ngOnInit() {
    this.userType = sessionStorage.getItem('userType');
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  
redirectSearch(value: string) {
  this.commonDataService.TypeSelected = value;
//  this.router.navigate(['/search']);
}

redirect(path: string) {
  if(path == 'viewItem') {
    const userId = sessionStorage.getItem('userId');
    this.router.navigate(['/viewItem', userId]);
  } else if(path == 'addItem') {
    this.router.navigate(['/addItem']);
  } else if(path == 'bookedList') {
    const userId = sessionStorage.getItem('userId');
    this.router.navigate(['/bookedList', userId]);
  } else if(path == 'vendorBookingItemList') {
    const userId = sessionStorage.getItem('userId');
    this.router.navigate(['/vendorBookingItemList', userId]);
  } else if(path == 'vendorBlockDates') {
    const userId = sessionStorage.getItem('userId');
    this.router.navigate(['/vendorBookingItemList', userId]);
  }
}


} 
