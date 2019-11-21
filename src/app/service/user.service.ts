import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User, Vendor } from '../../models/request-criteria/user';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError as ObservableThrowError} from 'rxjs'; 
import { ResponseMessage } from '../../models/response-message.model';
import { CommonDataService } from './common-data.service';

@Injectable()
export class UserService {
    public serviceurl: string = environment.serviceUrl;
    constructor(
        private http: HttpClient,
        private commonDataService: CommonDataService
    ){}

    public readonly userValidate_url: string = 'user/validate';
    public readonly userCreate_url: string = 'user/create';
    public readonly userRetrieve_url: string = 'user/profile/';
    public readonly vendorCreate_url: string = 'user/create/vendor';
    public readonly vendorValidate_url: string = 'user/validate/vendor';
    public readonly forgotPassword_url: string = 'user/forgotPassword';
    public readonly vendorForgotPassword_url: string = 'user/forgotPassword/vendor';
    public readonly updateUser_url: string = 'user/update';
    public readonly vendorRetrieve_url: string = 'user/vendorProfile/';
    public readonly updateVendor_url: string = 'user/update/vendor';

    retrieveUserDetails(userId: string) {
        const retrieveUserUrl = this.serviceurl + this.userRetrieve_url + userId;
        return this.http.get(retrieveUserUrl).pipe(
            tap(response => this.handleRetrieveUserResponse(response)),
            catchError(err => this.handleError(err))
        ); 
    }

    private handleRetrieveUserResponse(result?: any, type?: string) {
        this.commonDataService.User = result;
    }

    validateUser(validUserCriteria: User): any {
        const  validateUserUrl = this.serviceurl + this.userValidate_url;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.post(validateUserUrl, validUserCriteria, requestHeader).pipe(
            tap(response => this.handleValidateUserResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleValidateUserResponse(result?: any): any {
        if(result != null){
            this.commonDataService.User = result;
        }
    }

    forgotPassword(user: User): any {
        const forgotPasswordUrl = this.serviceurl + this.forgotPassword_url;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.post(forgotPasswordUrl, user, requestHeader).pipe(
            tap(response => this.handleForgotPasswordResponse(response)),
            catchError(err => this.handleError(err))
        ); 
    }

    forgotPasswordVendor(vendor: Vendor): any {
        const forgotPasswordUrl = this.serviceurl + this.vendorForgotPassword_url;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.post(forgotPasswordUrl, vendor, requestHeader).pipe(
            tap(response => this.handleForgotPasswordResponse(response)),
            catchError(err => this.handleError(err))
        ); 
    }

    private handleForgotPasswordResponse(result?: any): any {
        if(result != null){
            
        }
        return result;
    }

    saveUser(userObj: User): any {
        const  validateUserUrl = this.serviceurl + this.userCreate_url;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.post(validateUserUrl, userObj, requestHeader).pipe(
            tap(response => this.handleSaveResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    saveVendor(vendorObj: Vendor): any {
        const  saveVendorUrl = this.serviceurl + this.vendorCreate_url;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.post(saveVendorUrl, vendorObj, requestHeader).pipe(
            tap(response => this.handleSaveResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleSaveResponse(result?: any): any {
        let validUser: User = null;
        if(result != null){

        }
        return validUser;
    }

    validateVendor(vendor: Vendor): any {
        const  validateUserUrl = this.serviceurl + this.vendorValidate_url;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.post(validateUserUrl, vendor, requestHeader).pipe(
            tap(response => this.handleValidateVendorResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleValidateVendorResponse(result?: any): any {
        if(result != null){
            this.commonDataService.Vendor = result;
        }
    }

    retrieveVendorDetails(vendorId: string) {
        const retrieveVendorUrl = this.serviceurl + this.vendorRetrieve_url + vendorId;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.get(retrieveVendorUrl, requestHeader).pipe(
            tap(response => this.handleRetrieveVendorResponse(response)),
            catchError(err => this.handleError(err))
        ); 
    }

    private handleRetrieveVendorResponse(result?: any) {
        this.commonDataService.Vendor = result;
    }

    updateUserProfile(user: User): any {
        const  updateUserProfileUrl = this.serviceurl + this.updateUser_url;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.post(updateUserProfileUrl, user, requestHeader).pipe(
            tap(response => this.handleUpdateUserProfileResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleUpdateUserProfileResponse(result?: any): any {
        if(result != null){
            
        }
    }

    updateVendorProfile(vendor: Vendor): any {
        const  updateVendorProfileUrl = this.serviceurl + this.updateVendor_url;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.post(updateVendorProfileUrl, vendor, requestHeader).pipe(
            tap(response => this.handleUpdateVendorProfileResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleUpdateVendorProfileResponse(result?: any): any {
        if(result != null){
            
        }
    }
    
    

    private handleError(HttpError: any): Observable<never> {
        const errMsg = 'Error while fetching the data';
        return this.throwErrorMessage(errMsg);
    }

    private throwErrorMessage(message: string): Observable<never> {
        return ObservableThrowError(message);
    }

    private getJsonHeaders(): HttpHeaders {
        const headers: HttpHeaders = new HttpHeaders()
        .set('content-type', 'application/json')
   //     .set('Access-Control-Allow-Origin','http://localhost:9084')
   //     .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
   //     .set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')

        return headers;
    }
}
