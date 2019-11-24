/*import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { CommonDataService } from '../../service/common-data.service';
import { Item } from 'src/models/request-criteria/itemRetrieve-criteria';
import { ItemService } from '../../service/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BookingService } from '../../service/booking.service';
import { Booking, BookingDetails } from 'src/models/request-criteria/booking';
import { ToastrService } from 'ngx-toastr';
import { UserDetails, User } from 'src/models/request-criteria/user';


@Component({
  selector: 'app-adminBooking',
  templateUrl: './adminBooking.component.html',
  styleUrls: ['./adminBooking.component.css']
})
export class AdminBookingComponent implements OnInit {
 
  item: Item;
  fromDateSelected: Date;
  toDateSelected: Date;
  bookItemForm: FormGroup;
  isAvailable: Boolean = false;
  startDatePicker: Date;
  toDatePicker: Date;
  clicked: boolean = false;
  clickedAvail: boolean = true;
  
  constructor(private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute, private toastr: ToastrService,
  private commonDataService: CommonDataService, private itemService: ItemService,
  private bookingService: BookingService) { }

  ngOnInit() {
    this.startDatePicker = new Date();
    this.toDatePicker = new Date();
    this.bookItemForm = this.formBuilder.group({
 
      fromDateSelected: '',
      toDateSelected: '',
      advanceAmt: '',
      custName: '',
      mailId: '',
      address: '',
      mobile1: '',
      mobile2: ''
   });
   if(this.commonDataService.Item == null) {
    const itemId = this.route.snapshot.url[1].path
    this.retrieveItems(itemId);
   } else {
    this.item = this.commonDataService.Item;
   }
  }

  updateDate(event: any) {
    this.toDatePicker = event.value;
    this.clickedAvail = false;
    this.isAvailable = false;
  }


  retrieveItems(itemId: string): any {
    this.itemService.retrieveItem(itemId).subscribe(x =>{
      this.item = this.commonDataService.Item
    })
  }
  
  checkAvailability(itemId: string) {
    const bookingObj = this.generateBookingObj(itemId);
  
    this.bookingService.confirmAvailability(bookingObj).subscribe( response=> {
        this.isAvailable = response;
        if(response) {
          this.toastr.success('Selected Dates available for booking!', 'Confirm Availability!',{
            timeOut: 5000
          });
        } else {
          this.toastr.error('Selected Dates are not available for booking!', 'Confirm Availability!',{
            timeOut: 5000
          });
        }
    })
  }

  bookNow(itemId: string) {
    const bookingObj = this.generateBookingObj(itemId);
    var details: BookingDetails = new BookingDetails();
    var userDetails: UserDetails = new UserDetails();
    var user: User = new User();
    details.bookedThrough = "Direct";
    details.amtCollected = this.bookItemForm.controls['advanceAmt'].value;
    details.place = this.item.placeId;
    details.type = this.item.type;
    details.qtyAvailable = this.item.details.qtyAvailable;
    
    bookingObj.vendorId = this.item.vendorId;
    bookingObj.itemName = this.item.details.name;

    userDetails.name = this.bookItemForm.controls['custName'].value;
    userDetails.address = this.bookItemForm.controls['address'].value;
    this.bookItemForm.controls['mobile1'].value;
    this.bookItemForm.controls['mobile2'].value;
    user.emailId = this.bookItemForm.controls['mailId'].value;
    user.details = userDetails;
    details.userDetails = user;
    bookingObj.details = details;
    
    this.bookingService.bookItem(bookingObj).subscribe( response=> {
      if(response.responseMsg == "success"){
        this.router.navigate(['/bookingConfirmation']);
      } else if(response.responseMsg == "notAvailabile") {
        this.toastr.error('Selected Dates are not available for booking!', 'Confirm Availability!',{
          timeOut: 5000
        });
      } else {
        this.toastr.error('Cannot complete Booking at this moment. Please try later or contact ****', 'Booking error!',{
          timeOut: 5000
        });
      }
    })
  }

  generateBookingObj(itemId: string): Booking {
    const bookingObj: Booking = new Booking();
    bookingObj.itemId = itemId;
    
    bookingObj.bookingFromDate = this.bookItemForm.controls['fromDateSelected'].value;
    bookingObj.bookingToDate = this.bookItemForm.controls['toDateSelected'].value;
  
    if(bookingObj.bookingFromDate.toString() == "" || bookingObj.bookingToDate.toString() == "") {
       this.toastr.error('Please selected Dates to continue!', 'Check Availability!',{
        timeOut: 5000
      });
    }
    return bookingObj;
  }

  
}*/