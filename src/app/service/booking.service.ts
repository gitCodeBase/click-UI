import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError as ObservableThrowError} from 'rxjs'; 
import { CommonDataService } from './common-data.service';
import { Booking } from 'src/models/request-criteria/booking';

@Injectable()
export class BookingService {

    public serviceurl: string = environment.serviceUrl;
   
    constructor(
        private http: HttpClient,
        private commonDataService: CommonDataService
    ){}

    private bookItems_url: string = 'booking/';
    private userBookItems_url: string = 'booking/user/';
    private availability_url: string = 'booking/avail/confirm'
    private bookedItems_url: string = 'booking/bookedDetails/'
    private notifications_url: string = 'booking/notification/'
    private notificationCount_url: string = 'booking/notificationCount/'
    private notificationDelete_url: string = 'booking/notification/delete/'
  
    bookItem(bookingObj: Booking): any {
        const  bookItemUrl = this.serviceurl + this.bookItems_url;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.post(bookItemUrl, bookingObj, requestHeader).pipe(
            tap(response => this.handleBookItemResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleBookItemResponse(result?: any): any {
        return result;
    }

    confirmAvailability(bookingObj: Booking): any {
        const  bookItemUrl = this.serviceurl + this.availability_url;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.post(bookItemUrl, bookingObj, requestHeader).pipe(
            tap(response => this.handleAvailabilityResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleAvailabilityResponse(result?: any): any {
        return result;
    }

    retrieveBookedItems(vendorId: string) {
        const  retrieveBookedItemsUrl = this.serviceurl + this.bookItems_url+vendorId;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.get(retrieveBookedItemsUrl, requestHeader).pipe( 
            tap(response => this.handleBookedItemsResponse(response)),
            catchError(err => this.handleError(err))
        );
    }  

    private handleBookedItemsResponse(result?: any): any {
        if(result != null){
            this.commonDataService.BookedItems = result;
        }
        return result;
    }

    retrieveBookedItemsBasedOn(bookedId: string) {
        const  retrieveBookedItemsBasedOnUrl = this.serviceurl + this.bookedItems_url+bookedId;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.get(retrieveBookedItemsBasedOnUrl, requestHeader).pipe( 
            tap(response => this.handleBookedItemsBasedOnResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleBookedItemsBasedOnResponse(result?: any): any {
        if(result != null){
            this.commonDataService.BookedItemsDetails = result;
        }
        return result;
    }

    retrieveUserBookedDetails(userId: string) {
        const  retrieveBookedItemsBasedOnUrl = this.serviceurl + this.userBookItems_url + userId;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.get(retrieveBookedItemsBasedOnUrl, requestHeader).pipe( 
            tap(response => this.handleUserBookedItems(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleUserBookedItems(result?: any) {
        if(result != null && result.length > 0){
            this.commonDataService.BookedItems = result;
        } else {
            this.commonDataService.BookedItems = null;
        }
       
    }

    getNotifications(vendorId: string) {
        const  retrieveNotificationsUrl = this.serviceurl + this.notifications_url+vendorId;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.get(retrieveNotificationsUrl, requestHeader).pipe( 
            tap(response => this.handleNotificationResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleNotificationResponse(result?: any): any {
        if(result != null){
            this.commonDataService.Notifications = result;
        }
        return result;
    }

    getNotificationCount(vendorId: string) {
        const  retrieveNotificationCountUrl = this.serviceurl + this.notificationCount_url+vendorId;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.get(retrieveNotificationCountUrl, requestHeader).pipe( 
            tap(response => this.handleNotificationCountResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleNotificationCountResponse(result?: any) {
        if(result != null){
            this.commonDataService.NotificationCount = result.notificationCount;
        } else {
            this.commonDataService.NotificationCount = 0;
        }
        
    }

    clearNotificationCount(vendorId: string) {
        const  retrieveNotificationCountUrl = this.serviceurl + this.notificationDelete_url+vendorId;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.post(retrieveNotificationCountUrl, null, requestHeader).pipe( 
            catchError(err => this.handleError(err))
        );
    }


    private getJsonHeaders(): HttpHeaders {
        const headers: HttpHeaders = new HttpHeaders()
        .set('content-type', 'application/json')
       // .set('Access-Control-Allow-Origin','http://localhost:9084')
        //.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
        //.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
        return headers;
    }

    private handleError(HttpError: any): Observable<never> {
        const errMsg = 'Error while fetching the data';
        return this.throwErrorMessage(errMsg);
    }

    private throwErrorMessage(message: string): Observable<never> {
        return ObservableThrowError(message);
    }

}