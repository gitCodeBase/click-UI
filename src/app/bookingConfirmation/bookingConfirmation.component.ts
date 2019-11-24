import {Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
/**
 * @title Booking Confirmation Page
 */
@Component({
  selector: 'app-bookingConfirmation',
  templateUrl: './bookingConfirmation.component.html',
  styleUrls: ['./bookingConfirmation.component.css']
})
export class BookingConfirmationComponent implements OnInit {
 
  constructor(private toastr: ToastrService) { }
 
  ngOnInit() {
    this.toastr.success('Your booking is success. Please check your registered mail for Invoice!', 'Booked Successfully!',{
      disableTimeOut:false
    });
  }

  onResize(event) {
  }

  
}