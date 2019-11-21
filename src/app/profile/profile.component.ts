import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UserDetails, Vendor, VendorDetails } from '../../models/request-criteria/user';
import { UserService } from '../service/user.service';
import { CommonDataService } from '../service/common-data.service';
import { MatDialog } from '@angular/material';
import { BookingService } from '../service/booking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  vendor: Vendor;
  editProfileFlag: boolean = false;
  profileForm: FormGroup;
  primeContactNbr: string;
  secContactNbr: string;
  name: string;
  address: string;
  emailId: string;
  userType: string;
 
  constructor(
    private form: FormBuilder, private router: Router, private bookingService: BookingService,
    private userService: UserService, private route: ActivatedRoute, private toastr: ToastrService,
    private commonDataService: CommonDataService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile(){
    this.userType = sessionStorage.getItem('userType');
    var id = sessionStorage.getItem("userId");
    if(this.userType == 'vendor'){
      this.userService.retrieveVendorDetails(id).subscribe(state =>{
        this.vendor = this.commonDataService.Vendor
        if(this.vendor.details.contactNbr != null || this.vendor.details.contactNbr != undefined) {
          this.primeContactNbr = this.vendor.details.contactNbr[0];
          this.secContactNbr = this.vendor.details.contactNbr[1];
        }
        this.name = this.vendor.details.name;
        this.address = this.vendor.details.address;
        this.emailId = this.vendor.emailId;
      });
    } else {
      this.userService.retrieveUserDetails(id).subscribe(state =>{
        this.user = this.commonDataService.User
        if(this.user.details.contactNbr != null || this.user.details.contactNbr != undefined) {
          this.primeContactNbr = this.user.details.contactNbr[0];
          this.secContactNbr = this.user.details.contactNbr[1];
        }
        this.name = this.user.details.name;
        this.address = this.user.details.address;
        this.emailId = this.user.emailId;
      });
    }
  }

  openCustomerBookedList(userId: string): void {
    this.router.navigate(['/bookedDetails']);
  }

  
  editProfile() {
    this.editProfileFlag = true;
    this.profileForm = this.form.group({
      name: '',
      address: '',
      primeContactNbr: '',
      secContactNbr: '',
      mailId: ''
    });
    this.profileForm.controls['name'].setValue(this.name);
    this.profileForm.controls['address'].setValue(this.address);
    this.profileForm.controls['primeContactNbr'].setValue(this.primeContactNbr);
    this.profileForm.controls['secContactNbr'].setValue(this.secContactNbr);
    this.profileForm.controls['mailId'].setValue(this.emailId);
  }

  updateProfile() {

    if(this.userType == 'vendor') {
      var vendor = new Vendor();
      var vndrDetails = new VendorDetails();
      vndrDetails.name = this.profileForm.controls['name'].value;
      vndrDetails.address = this.profileForm.controls['address'].value;
      vndrDetails.contactNbr = [this.profileForm.controls['primeContactNbr'].value,
        this.profileForm.controls['secContactNbr'].value];
      
        vendor.emailId = this.profileForm.controls['mailId'].value;
      vendor._id = sessionStorage.getItem("userId");
      vendor.details = vndrDetails;
      
      this.userService.updateVendorProfile(vendor).subscribe(response =>{
        if(response.success) {
          this.toastr.success('Vendor details updated successfully!', 'Updated Successfully!',{
            timeOut: 5000
          });
          this.editProfileFlag = false;
          this.loadProfile();
        } else {
          this.toastr.error('Could not update deatils. Please contact the technical team!', 'Error!',{
            timeOut: 5000
          });
        }
      });

    } else {
      var user = new User();
      var details = new UserDetails();
      details.name = this.profileForm.controls['name'].value;
      details.address = this.profileForm.controls['address'].value;
      details.contactNbr = [this.profileForm.controls['primeContactNbr'].value,
        this.profileForm.controls['secContactNbr'].value];
      
      user.emailId = this.profileForm.controls['mailId'].value;
      user._id = sessionStorage.getItem("userId");
      user.details = details;

      this.userService.updateUserProfile(user).subscribe(response =>{
        if(response.success) {
          this.toastr.success('User details updated successfully!', 'Updated Successfully!',{
            timeOut: 5000
          });
          this.editProfileFlag = false;
          this.loadProfile();
        } else {
          this.toastr.error('Could not update deatils. Please contact the technical team!', 'Error!',{
            timeOut: 5000
          });
        }
      });
    }
  }
    

  
}
