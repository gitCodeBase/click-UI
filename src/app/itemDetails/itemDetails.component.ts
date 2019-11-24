import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonDataService } from '../service/common-data.service';
import { Item, Amenities, Reviews, Image } from 'src/models/request-criteria/itemRetrieve-criteria';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Booking, BookingDetails } from 'src/models/request-criteria/booking';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BookingService } from '../service/booking.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { ItemDetailsModalComponent } from './itemDetailsModal.component';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

@Component({
  selector: 'app-itemDetails',
  templateUrl: './itemDetails.component.html',
  styleUrls: ['./itemDetails.component.css']
})
export class ItemDetailsComponent implements AfterViewInit, OnInit {
  
  itemDetails: Item;
  itemDetailsForm: FormGroup;
  availabilityCheck: Boolean = false;
  reviews: Reviews[];
  startDatePicker: Date;
  toDatePicker: Date;
  redirectUrl: string;
  clickedAvail: boolean = true;
  clicked: boolean = false;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  kk: any;
  imageToShow: any;
  obj: NgxGalleryImage;
  images: Image[];
  amount: string;

  constructor(
    private cdr: ChangeDetectorRef, private commonDataService: CommonDataService,
    private route: ActivatedRoute, private bookingService: BookingService,
    private itemService: ItemService, private _formBuilder: FormBuilder,
    private toastr: ToastrService, public dialog: MatDialog, private router: Router) { }
 
  ngOnInit() {
    this.redirectUrl = this.router.url;
    sessionStorage.setItem("redirectUrl", this.redirectUrl);

    this.startDatePicker = new Date();
    this.toDatePicker = new Date();
    this.itemDetailsForm = this._formBuilder.group({
      fromDate: '',
      toDate: '',
      advanceAmt: ''
    });
    window.scroll(0,0);

    const itemId: string = this.route.snapshot.paramMap.get('id');
    this.searchItems(itemId);
  //  this.retrieveImages(itemId);

    this.galleryOptions = [
      {
          width: '400px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];
  }

  updateDate(event: any) {
    this.toDatePicker = event.value;
    this.clickedAvail = false;
    this.availabilityCheck = false;
  }

  searchItems(itemId: string) {
    this.itemService.retrieveItem(itemId).subscribe(item =>{
      this.itemDetails = this.commonDataService.Item;
      this.reviews = this.commonDataService.Item.reviews;
      this.images = this.commonDataService.Item.images;

      this.galleryImages = [
        {
            small: 'http://localhost:8080/api/item/image/retrieve/'+this.images[0].fileName+"/",
            medium: 'http://localhost:8080/api/item/image/retrieve/'+this.images[0].fileName+"/",
            big: 'http://localhost:8080/api/item/image/retrieve/'+this.images[0].fileName+"/"
        }]
  

      for(let o of this.images) {
        this.obj = {
          small: 'http://localhost:8080/api/item/image/retrieve/'+o.fileName+"/",
          medium: 'http://localhost:8080/api/item/image/retrieve/'+o.fileName+"/",
          big: 'http://localhost:8080/api/item/image/retrieve/'+o.fileName+"/"
      };
      this.galleryImages.push(this.obj);
      }

      
       
      
     
  })
}
  
  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  checkAvailability() {
    const bookingObj: Booking = this.generateBookingObj('AvailabilityCheck');
    if(bookingObj != null) {
      this.bookingService.confirmAvailability(bookingObj).subscribe(flag =>{
        this.availabilityCheck = flag;
        if(flag) {
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
  }

  bookItem() {
    if(sessionStorage.getItem('userId') == null) {
      this.toastr.error('Please login to continue booking!', 'Login required!',{
        disableTimeOut:false
      });
    }
    const bookingObj: Booking = this.generateBookingObj('Booking');
    if(bookingObj != null) {
      this.bookingService.confirmAvailability(bookingObj).subscribe(item =>{
      })
      this.bookingService.bookItem(bookingObj).subscribe(response =>{
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
  }

  generateBookingObj(type: string): Booking {
    const bookingObj: Booking = new Booking();
    const bookingDetails: BookingDetails = new BookingDetails();
    bookingObj.itemId = this.commonDataService.Item._id;
    
    bookingObj.bookingFromDate = this.itemDetailsForm.controls['fromDate'].value;
    bookingObj.bookingToDate = this.itemDetailsForm.controls['toDate'].value;
    if(bookingObj.bookingFromDate.toString() == "" || bookingObj.bookingToDate.toString() == ""){
      this.toastr.error('Please selected Dates to continue!', 'Check Availability!',{
        timeOut: 5000
      });
    }
    bookingObj.userId = sessionStorage.getItem('userId');
    if(bookingObj.userId == null && type == 'Booking') {
      return null;
    }
    bookingObj.itemName = this.commonDataService.Item.details.name;
    bookingObj.vendorId = this.commonDataService.Item.vendorId;

  //  bookingDetails.bookingFromTime = this.itemDetailsForm.controls['amenity1'].value;
  //  bookingDetails.bookingToTime = this.itemDetailsForm.controls['amenity2'].value;
    bookingDetails.place = this.commonDataService.Item.placeId;
    if(type == 'Booking'){
      bookingDetails.bookedThrough = "Boogiee.com";
      bookingDetails.amtCollected = this.itemDetailsForm.controls['advanceAmt'].value;
    }
  //  bookingDetails.type = this.commonDataService.Item.type;
   
    bookingObj.details = new BookingDetails();
    bookingObj.details = bookingDetails;
    return bookingObj;
  }

  openReviewDialog(): void {

    let dialogRef = this.dialog.open(ItemDetailsModalComponent, {
        width: '450px',
        data: ''
    });
  
    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
    });
  }

}
