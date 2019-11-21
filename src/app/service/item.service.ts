import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError as ObservableThrowError} from 'rxjs'; 
import { Item } from '../../models/request-criteria/itemRetrieve-criteria';
import { CommonDataService } from './common-data.service';

@Injectable()
export class ItemService {
    public serviceurl: string = environment.serviceUrl;
    private item: Item = new Item();
    constructor(
        private http: HttpClient,
        private commonDataService: CommonDataService
    ){}

    public retrieve_Items: string = 'item/fetch/';
    public retrieve_Item: string = 'item/';
    public create_Item: string = 'item/create';
    public update_Item: string = 'item/update';
    public retrieve_Item_vendorId: string = 'item/vendor/';
    public readonly uploadImage_url: string =  'item/image/upload';
    public readonly retrieveImage_url: string = 'item/image/retrieve';
    
    retrieveItem(itemId: string): any {
        const  retrieveItemUrl = this.serviceurl + this.retrieve_Item+"/"+itemId;
        return this.http.get(retrieveItemUrl).pipe(
            tap(response => this.handleRetrieveItemResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleRetrieveItemResponse(result?: any): any {
        let itemList: Item[] = null;
        if(result != null){
            this.commonDataService.Item = result;
        }
        return result;
    }

    
    retrieveItems(item: Item): any {
      
        const  retrieveItemsUrl = this.serviceurl + this.retrieve_Items;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.post(retrieveItemsUrl, item, requestHeader).pipe(
            tap(response => this.handleRetrieveItemsResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleRetrieveItemsResponse(result?: any): any {
        let itemList: Item[] = null;
        if(result != null){
            this.commonDataService.ItemList = result;
        }
        return result;
    }

    saveItem(item: Item): any {
        const  createItemUrl = this.serviceurl + this.create_Item;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.post(createItemUrl, item, requestHeader).pipe(
            tap(response => this.handleCreatedItemResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    updateItem(item: Item): any {
        const  updateItemUrl = this.serviceurl + this.update_Item;
        const requestHeader = { headers : this.getJsonHeaders()};
        return this.http.post(updateItemUrl, item, requestHeader).pipe(
            tap(response => this.handleCreatedItemResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleCreatedItemResponse(result?: any): any {
        let itemList: Item[] = null;
        if(result != null){
        //    this.commonDataService.ItemList = result;
        }
        return result;
    }

    retrieveItemsBasedOnVendor(vendorId: string): any {
        const  retrieveItemUrl = this.serviceurl + this.retrieve_Item_vendorId+"/"+vendorId;
        return this.http.get(retrieveItemUrl).pipe(
            tap(response => this.handleRetrieveItemsResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    upload(data: FormData, itemId: string, mainImageUrl: boolean): any {
        const  imageUploadUrl = this.serviceurl + this.uploadImage_url+"/"+itemId+"/"+mainImageUrl;
        return this.http.post(imageUploadUrl, data).pipe(
            tap(response => this.handleImageUploadResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    retrieveImages(itemId: string): any {
        const  imageUploadUrl = this.serviceurl + this.retrieveImage_url+"/"+itemId;
        return this.http.get(imageUploadUrl, { responseType: 'blob' });
    }

   
    private handleImageUploadResponse(result?: any): any {
        if(result != null){
        //    this.commonDataService.ItemList = result;
        }
        return result;
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
      //  .set('Access-Control-Allow-Origin','http://localhost:9084')
        //.set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
        //.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
        return headers;
    }
}
