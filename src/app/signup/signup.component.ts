import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { User, UserDetails, Vendor, VendorDetails } from '../../models/request-criteria/user';
import { UserService } from '../service/user.service';
import { State, City } from 'src/models/request-criteria/state';
import { CommonDataService } from '../service/common-data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  type: string;
  hide1: string;
  hide2: string;
  states: State[];
  cities: City[];
  breakpoint: number;
 
  constructor(
    private form: FormBuilder, private router: Router,
    private userService: UserService, private route: ActivatedRoute,
    private commonDataService: CommonDataService) { }

  ngOnInit() {

    this.type = this.route.snapshot.paramMap.get('type');
    this.hide1 = 'true';
    this.hide2 = 'true';
    this.signupForm = this.form.group({
      mailId: ['', Validators.required],
      password: ['', Validators.required],
      name: '',
      address: '',
      mobile1: '',
      state: '',
      city: ''
    });
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;

    this.commonDataService.retrieveStates().subscribe(state =>{
      this.states = this.commonDataService.StatesList
    })
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }

  populateCity(value: State) {
    this.commonDataService.StateId = value.id;
    this.commonDataService.retrieveCities(value.id).subscribe(city =>{
      this.cities = this.commonDataService.Cities;
    })
  }

  onSubmit() {
  }

  generateUserObj(): User {
    const user: User = new User();
    const userDetails: UserDetails = new UserDetails();
    user.emailId = this.signupForm.controls['mailId'].value;
    user.password = this.signupForm.controls['password'].value;
    
    userDetails.address = this.signupForm.controls['address'].value;
  //  userDetails.contactNbr[0] = this.loginForm.controls['mobile1'].value;
    userDetails.name = this.signupForm.controls['name'].value;

    user.details = userDetails;
    return user;
  }

  generateVendorObj(): Vendor {
    const vendor: Vendor = new Vendor();
    const vendorDetails: VendorDetails = new VendorDetails();
    vendor.emailId = this.signupForm.controls['mailId'].value;
    vendor.password = this.signupForm.controls['password'].value;
    
    vendorDetails.address = this.signupForm.controls['address'].value;
    vendorDetails.contactNbr = [];
    vendorDetails.contactNbr.push(this.signupForm.controls['mobile1'].value);
    vendorDetails.name = this.signupForm.controls['name'].value;

    vendor.details = vendorDetails;
    return vendor;
  }

  createUser(){
    if(this.type == 'vendor'){
      const vendorObj = this.generateVendorObj();
      this.userService.saveVendor(vendorObj).subscribe(user =>{
        //  this.commonDataService.SetCountryCode ="kkkk";
    
          this.router.navigate(['/home']);
        })
    } else {
      const userObj = this.generateUserObj();
      this.userService.saveUser(userObj).subscribe(user =>{
        //  this.commonDataService.SetCountryCode ="kkkk";
    
          this.router.navigate(['/home']);
        })
    }

    
  }

}
