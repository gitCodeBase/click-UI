import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError as ObservableThrowError} from 'rxjs'; 
import { State, City, Place, ItemType } from '../../models/request-criteria/state';
import { MultiSelectValue } from 'src/models/multi-select.model';
import { Item } from '../../models/request-criteria/itemRetrieve-criteria';
import { User, Vendor } from 'src/models/request-criteria/user';
import { Booking, Notification } from 'src/models/request-criteria/booking';

@Injectable()
export class CommonDataService {
    public serviceurl: string = environment.serviceUrl;
  
    public readonly statesService_url: string = 'common/states';
    public readonly cityService_url: string = 'common/cities';
    public readonly placesService_url: string = 'common/places';
    public readonly itemTypeService_url: string ='common/types';
    private itemNbr: string;
    private countryCode: string;
    private statesList: State[];
    private cities: City[];
    private places: Place[];
    private itemList: Item[];
    private typeSelected: string;
    private dateSelected: string;
    private placeId: string;
    private stateId: string;
    private cityId: string;
    private item: Item;
    private user: User;
    private vendor: Vendor;
    private itemTypes: ItemType[];
    private bookedItems: Booking[];
    private bookedItemDetails: Booking;
    private notifications: Notification[];
    private notificationCount: number;
    private state: State;
    private city: City;

    constructor(private http: HttpClient) {}

    @Output() clearControl: EventEmitter<boolean> = new EventEmitter();

    ClearFilterControl() {
        this.clearControl.emit();
    }

    public get GetItemNbr(): string {
        return this.itemNbr;
    }
    public set SetItemNbr(value: string) {
        this.itemNbr = value;
    }

    public get GetCountryCode(): string {
        return this.countryCode;
    }
    public set SetCountryCode(value: string) {
        this.countryCode = value;
    }

    public get StatesList(): State[] {
        return this.statesList;
    }
    public set StatesList(value: State[]) { 
        this.statesList = value;
    }
    public get Cities(): City[] {
        return this.cities;
    }
    public set Cities(value: City[]) { 
        this.cities = value;
    }
    public get Places(): Place[] {
        return this.places;
    }
    public set Places(value: Place[]) { 
        this.places = value;
    }
    public get ItemList(): Item[] {
        return this.itemList;
    }
    public set ItemList(value: Item[]) { 
        this.itemList = value;
    }
    public get TypeSelected(): string {
        return this.typeSelected;
    }
    public set TypeSelected(value: string) { 
        this.typeSelected = value;
    }
    public get DateSelected(): string {
        return this.dateSelected;
    }
    public set DateSelected(value: string) { 
        this.dateSelected = value;
    }
    public get PlaceId(): string {
        return this.placeId;
    }
    public set PlaceId(value: string) { 
        this.placeId = value;
    }
    public get StateId(): string {
        return this.stateId;
    }
    public set StateId(value: string) { 
        this.stateId = value;
    }
    public get CityId(): string {
        return this.cityId;
    }
    public set CityId(value: string) { 
        this.cityId = value;
    }
    public get Item(): Item {
        return this.item;
    }
    public set Item(value: Item) { 
        this.item = value;
    }
    public get User(): User {
        return this.user;
    }
    public set User(value: User) { 
        this.user = value;
    }
    public get Vendor(): Vendor {
        return this.vendor;
    }
    public set Vendor(value: Vendor) { 
        this.vendor = value;
    }
    public get ItemTypes(): ItemType[] {
        return this.itemTypes;
    }
    public set ItemTypes(value: ItemType[]) { 
        this.itemTypes = value;
    }
    public get BookedItems(): Booking[] {
        return this.bookedItems;
    }
    public set BookedItems(value: Booking[]) { 
        this.bookedItems = value;
    }
    public get BookedItemsDetails(): Booking {
        return this.bookedItemDetails;
    }
    public set BookedItemsDetails(value: Booking) { 
        this.bookedItemDetails = value;
    }
    public get Notifications(): Notification[] {
        return this.notifications;
    }
    public set Notifications(value: Notification[]) { 
        this.notifications = value;
    }
    
    public get NotificationCount(): number {
        return this.notificationCount;
    }
    public set NotificationCount(value: number) { 
        this.notificationCount = value;
    }
    public get State(): State {
        return this.state;
    }
    public set State(value: State) { 
        this.state = value;
    }
    public get City(): City {
        return this.city;
    }
    public set City(value: City) { 
        this.city = value;
    }
    
    
    
    retrieveStates(): any {
        const  retrieveStatesUrl = this.serviceurl + this.statesService_url;
        const requestHeader = { headers : this.getJsonHeaders(retrieveStatesUrl)};
        return this.http.get(retrieveStatesUrl, requestHeader).pipe(
            tap(response => this.handleRetrieveStatesResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleRetrieveStatesResponse(result?: any): any {
        let states: State = null;
        if(result != null){
            this.statesList = result;
        }
        return states;
    }

    retrieveCities(id: string): any {
        const  retrieveCitiesUrl = this.serviceurl + this.cityService_url +"/"+id;
        const requestHeader = { headers : this.getJsonHeaders(retrieveCitiesUrl)};
        return this.http.get(retrieveCitiesUrl, requestHeader).pipe(
            tap(response => this.handleRetrieveCitiesResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleRetrieveCitiesResponse(result?: any): any {
        let states: City = null;
        if(result != null){
            this.cities = result;
        }
        return states;
    }

    retrievePlaces(id: string): any {
        const  retrievePlacesUrl = this.serviceurl + this.placesService_url +"/"+id;
        const requestHeader = { headers : this.getJsonHeaders(retrievePlacesUrl)};
        return this.http.get(retrievePlacesUrl, requestHeader).pipe(
            tap(response => this.handleRetrievePlacesResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    private handleRetrievePlacesResponse(result?: any): any {
        let places: Place = null;
        if(result != null) {
            this.places = result;
        }
        return places;
    }

    searchItems(type: string, id:string):any {
        const  retrievePlacesUrl = this.serviceurl + this.placesService_url +"/"+id;
        const requestHeader = { headers : this.getJsonHeaders(retrievePlacesUrl)};
        return this.http.get(retrievePlacesUrl, requestHeader).pipe(
            tap(response => this.handleRetrievePlacesResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    populateTypes():any {
        const  retrieveItemTypeUrl = this.serviceurl + this.itemTypeService_url;
        const requestHeader = { headers : this.getJsonHeaders(retrieveItemTypeUrl)};
        return this.http.get(retrieveItemTypeUrl, requestHeader).pipe(
            tap(response => this.handleRetrieveItemTypesResponse(response)),
            catchError(err => this.handleError(err))
        );
    }

    handleRetrieveItemTypesResponse(result?: any): any {
        let itemTypes: ItemType = null;
        if(result != null){
            this.itemTypes = result;
        }
        return itemTypes;

    }


    private handleError(HttpError: any): Observable<never> {
        const errMsg = 'Error while fetching the data';
        return this.throwErrorMessage(errMsg);
    }

    private throwErrorMessage(message: string): Observable<never> {
        return ObservableThrowError(message);
    }

    private getJsonHeaders(validateUserUrl: any): HttpHeaders {
        const headers: HttpHeaders = new HttpHeaders()
        .set('Content-Type', 'application/json')
       // .set('Access-Control-Allow-Origin','http://localhost:9084')
       // .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
       // .set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')

        return headers;
    }

}