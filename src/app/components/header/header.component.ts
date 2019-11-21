import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/service/booking.service';
import { MatDialog } from '@angular/material';
import { NotificationModalComponent } from '../notificationModal/notificationModal.component';
import { CommonDataService } from 'src/app/service/common-data.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private bookingService: BookingService,
    public dialog: MatDialog, private commonDataService: CommonDataService, 
    private route: ActivatedRoute, private ngxService: NgxUiLoaderService) { 
      
      route.params.subscribe(val => {
        this.notificationCount = this.commonDataService.NotificationCount;
        
      });
    }
  
  userName: string;
  userType: string;
  notificationCount: number;
  
  
  ngOnInit() {
    const vendorId = sessionStorage.getItem('userId');
    this.userName = sessionStorage.getItem('userName');
    this.userType = sessionStorage.getItem('userType');
    if(this.userType == 'vendor') {
      this.bookingService.getNotificationCount(vendorId).subscribe(x =>{
        this.notificationCount = this.commonDataService.NotificationCount;
      });
    }
    
  }

  signout() {
    this.ngxService.start();
    const vendorId = sessionStorage.getItem('userId');
    this.userType = sessionStorage.getItem('userType');
    if(this.userType == 'vendor') {
      this.bookingService.clearNotificationCount(vendorId).subscribe(x =>{
        
      });
    }
    sessionStorage.clear();
  }

  vendorLogin() {
    this.router.navigate(['/login', "vendor"]);
  }
 
  customerLogin() {
    this.router.navigate(['/login', "customer"]);
  }

  getNotifications() {
    const vendorId = sessionStorage.getItem('userId');
    
    this.bookingService.getNotifications(vendorId).subscribe(x =>{
      
      let dialogRef = this.dialog.open(NotificationModalComponent, {
       width: '350px',
        data: this.commonDataService.Notifications
      });

      dialogRef.afterClosed().subscribe(result => {
        this.notificationCount = 0;
        console.log('The dialog was closed');
      });
    });
  }

}
