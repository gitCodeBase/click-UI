import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonDataService } from '../service/common-data.service';
import { UserService } from '../service/user.service';
import { User, Vendor } from '../../models/request-criteria/user';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  userName: string;
  type: string;
  hide: string;
  message: string;
  passwordReset: boolean;

  constructor(
    private fromBuilder: FormBuilder, private router: Router,
    private commonDataService: CommonDataService,
    private userService: UserService, private route: ActivatedRoute,
    private toastr: ToastrService, private ngxService: NgxUiLoaderService) {
      route.params.subscribe(val => {
        this.type = this.route.snapshot.paramMap.get('type');
      });
    }

  ngOnInit() {
    const type: string = this.route.snapshot.paramMap.get('type');
    this.hide = 'true';
    if(type != undefined || type != ''){
      this.type = type;
    }
    this.loginForm = this.fromBuilder.group({
      email: ['', Validators.required],
      password: ''
    });
  }   
 
  onSubmit() {
    this.ngxService.start();
    if(this.type == 'vendor'){
      const validVendorCriteria = this.generateValidVendorCriteria();
      this.userService.validateVendor(validVendorCriteria).subscribe(vendor =>{
        if( this.commonDataService.Vendor != null) {
          if(this.commonDataService.Vendor.wrongPasswordCount >= 5){
            this.ngxService.stop();
            this.loginForm.controls['password'].setValue('');
            this.message = "Wrong UserName/Password - You have tried maximum attempts.";
          } else {
            this.setSessionVendorStorage(this.commonDataService.Vendor);
            var redirectUrl = sessionStorage.getItem("redirectUrl");
            if(redirectUrl != null){
              window.location.href = redirectUrl;  
            } else {
              window.location.href = "/home";
            }
          }
        } else {
          this.ngxService.stop();
          this.loginForm.controls['password'].setValue('');
          this.message = "Wrong UserName/Password";
        }
      })
    } else {
      const validUserCriteria = this.generateValidUserCriteria();
      this.userService.validateUser(validUserCriteria).subscribe(user =>{
        if( this.commonDataService.User != null) {
          if(this.commonDataService.User.wrongPasswordCount >= 5){
            this.ngxService.stop();
            this.loginForm.controls['password'].setValue('');
            this.message = "Wrong UserName/Password - You have tried maximum attempts.";
          } else {
            this.setSessionUserStorage(this.commonDataService.User);
            var redirectUrl = sessionStorage.getItem("redirectUrl");
            if(redirectUrl != null){
              window.location.href = redirectUrl;  
            } else {
              window.location.href = "/home";
            }
          }
        } else {
          this.ngxService.stop();
          this.loginForm.controls['password'].setValue('');
          this.message = "Wrong UserName/Password";
        }
      })
    }
  }

  forgotPassword() {
    const email = this.loginForm.controls['email'].value
    if(email == undefined || email.trim() == '') {
      this.toastr.error('EmailId is required for reseting your password!', 'Forgot Password!',{
        disableTimeOut:false
      });
    } else {
      
      if(this.type == 'vendor') {
        const vendor: Vendor = new Vendor();
        vendor.emailId = email;
        this.userService.forgotPasswordVendor(vendor).subscribe(mailSend =>{
          this.passwordReset = mailSend;
          if(mailSend == true || mailSend == 'true') {
            this.toastr.success('Password reset. Please check your mail for details!', 'Password Reset!',{
              disableTimeOut:false
            });
          } else {
            this.toastr.error('EmailId entered is not registered with us! Please try again', 'Password Reset!',{
              disableTimeOut:false
            });
          }
        });
      } else {
        const user: User = new User();
        user.emailId = email;
        this.userService.forgotPassword(user).subscribe(mailSend =>{
          this.passwordReset = mailSend;
          if(mailSend == true || mailSend == 'true') {
            this.toastr.success('Password reset. Please check your mail for details!', 'Password Reset!',{
              disableTimeOut:false
            });
          } else {
            this.toastr.error('EmailId entered is not registered with us! Please try again', 'Password Reset!',{
              disableTimeOut:false
            });
          }
        });
      }
    }
  }

  generateValidUserCriteria(): User {
    const user: User = new User();
    user.emailId = this.loginForm.controls['email'].value;
    user.password =  this.loginForm.controls['password'].value;
  
    return user;
  }

  generateValidVendorCriteria(): Vendor {
    const vendor: Vendor = new Vendor();
    vendor.emailId = this.loginForm.controls['email'].value;
    vendor.password =  this.loginForm.controls['password'].value;

    return vendor;
  }

  setSessionUserStorage(user: User) {
    sessionStorage.setItem(
      'userName', this.userName = this.commonDataService.User.details.name
    );
    sessionStorage.setItem(
      'loginId',
      JSON.stringify(this.commonDataService.User.emailId)
    );
    sessionStorage.setItem(
      'userId',
      this.commonDataService.User._id
    );
    sessionStorage.setItem('userType', this.type);
  }

  setSessionVendorStorage(vendor: Vendor) {
    sessionStorage.setItem(
      'userName', this.userName = this.commonDataService.Vendor.details.name
    );
    sessionStorage.setItem(
      'loginId',
      JSON.stringify(this.commonDataService.Vendor.emailId)
    );
    sessionStorage.setItem(
      'userId',
      this.commonDataService.Vendor._id
    );
    sessionStorage.setItem('userType', this.type);
  }

  vendorRegistration() {
    this.router.navigate(['/signup', 'vendor']);
  }

}
