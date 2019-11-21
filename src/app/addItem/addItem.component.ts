import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonDataService } from '../service/common-data.service';
import { ItemType, State, City, Place } from 'src/models/request-criteria/state';
import { Item, ItemDetails, Amenities, Pricing } from 'src/models/request-criteria/itemRetrieve-criteria';
import { ItemService } from '../service/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

/**
 * @title Component to Add item
 */
@Component({
  selector: 'app-addItem',
  templateUrl: './addItem.component.html',
  styleUrls: ['./addItem.component.css']
})
export class AddItemComponent implements OnInit {
 
  formGroup: FormGroup;
  itemFormGroup: FormGroup;

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  itemTypes = String[10];
  states = String[14];
  cities = String[50];
  places = String[50];
  place: string;
  
  readOnly: string;
  action: string;
  itemList: Item[];
  item: Item;
  typeSelected: ItemType;
  isMobile: Boolean;
  isTablet: Boolean;
  isDesktopDevice: Boolean;
    
  constructor(private _formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute, private deviceService: DeviceDetectorService,
  private commonDataService: CommonDataService, private itemService: ItemService) { }

  validateForm1() {
    alert("inside validate "+this.firstFormGroup.controls['name'].value);
    
  }

  ngOnInit() {
    this.item = new Item;
    //  const deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
     
    this.firstFormGroup = this._formBuilder.group({
      name: '',
      type: '',
      address: '',
      state: '',
      city: '',
      place: '',
      email:'',
      contactNbr1: '',
      contactNbr2:'',
      qtyAvailable:''

    });
    this.secondFormGroup = this._formBuilder.group({
      description: '',
      amenity1: '',
      amenity2: '',
      amenity3: '',
      temperatureCtrl:'',
      dressChangingRoom:'',
      kitchen:''
    });

    this.thirdFormGroup = this._formBuilder.group({
      cost: '',
      tax: '',
      discount: ''
    });

    this.readOnly = "false";
    this.commonDataService.populateTypes().subscribe(type =>{
      this.itemTypes = this.commonDataService.ItemTypes;
    });

    this.commonDataService.retrieveStates().subscribe(state =>{
      this.states = this.commonDataService.StatesList
    });
   
  }

 
  urls = [];
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();

                reader.onload = (event) => {
                  console.log(event.target);
                   this.urls.push(event.target); 
                }

                reader.readAsDataURL(event.target.files[i]);
        }
    }
  }

  populateCity(value: State) {
    if(value != undefined) {
      this.commonDataService.StateId = value.id;
      this.commonDataService.retrieveCities(value.id).subscribe(city =>{
        this.cities = this.commonDataService.Cities
      })
    }
  }

  populatePlaces(value: City) {
    if(value != undefined) {
      this.commonDataService.CityId = value.id;
      this.commonDataService.retrievePlaces(value.id).subscribe(place =>{
        this.places = this.commonDataService.Places
      })
    }
  }

  formSubmited() {
    const item: Item = this.generateItemObj();
    this.itemService.saveItem(item).subscribe(itemObj => {
      this.router.navigate(['/uploadImage/'+itemObj._id]);
      
    })
    
  }

  retrieveItems(vendorId: string) {
    this.itemService.retrieveItemsBasedOnVendor(vendorId).subscribe(itemObj => {
      this.itemList = this.commonDataService.ItemList;
      this.router.navigate(['/viewItem/'+vendorId]);
      
    })
    
  }

  generateItemObj(): Item {
    const item: Item = new Item();
    const itemDetails: ItemDetails = new ItemDetails();
    const amenities: Amenities = new Amenities();
    const price: Pricing = new Pricing();

    item.placeId = this.firstFormGroup.controls['place'].value.id;
    item.type = this.firstFormGroup.controls['type'].value._id;
    item.vendorId = sessionStorage.getItem("userId");
    
    itemDetails.name = this.firstFormGroup.controls['name'].value;
    itemDetails.address = this.firstFormGroup.controls['address'].value;
    itemDetails.mailId = this.firstFormGroup.controls['email'].value;
    itemDetails.qtyAvailable = this.firstFormGroup.controls['qtyAvailable'].value;
    itemDetails.place = this.firstFormGroup.controls['place'].value.name;
   
    var contactNum: String[] =[];
    contactNum.push(this.firstFormGroup.controls['contactNbr1'].value, this.firstFormGroup.controls['contactNbr2'].value);
    itemDetails.contactNum = contactNum;
  
    itemDetails.description = this.secondFormGroup.controls['description'].value;

    amenities.amenity1 = this.secondFormGroup.controls['amenity1'].value;
    amenities.amenity2 = this.secondFormGroup.controls['amenity2'].value;
    amenities.amenity3 = this.secondFormGroup.controls['amenity3'].value;
    amenities.amenity4 = this.secondFormGroup.controls['temperatureCtrl'].value;
    amenities.amenity5 = this.secondFormGroup.controls['dressChangingRoom'].value;
    amenities.amenity6 = this.secondFormGroup.controls['kitchen'].value;

    price.baseRate = this.thirdFormGroup.controls['cost'].value;
    price.tax = this.thirdFormGroup.controls['tax'].value;
    price.discount = this.thirdFormGroup.controls['discount'].value;
    

    itemDetails.amenities = amenities;
    item.details = itemDetails;
    item.price = price;
    return item;
  }
}