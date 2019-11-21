import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { CommonDataService } from '../service/common-data.service';
import { City, State } from 'src/models/request-criteria/state';
import { Item, ItemDetails, Amenities, Pricing } from 'src/models/request-criteria/itemRetrieve-criteria';
import { ItemService } from '../service/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

/**
 * @title Stepper
 */
@Component({
  selector: 'app-viewItem',
  templateUrl: './viewItem.component.html',
  styleUrls: ['./viewItem.component.css']
})
export class ViewItemComponent implements OnInit {
 
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
  placeId: string;

  readOnly: string;
  action: string;
  itemList: Item[];
 
  constructor(private _formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute,
  private commonDataService: CommonDataService, private itemService: ItemService,
  private ngxService: NgxUiLoaderService) { }

  validateForm1() {
    alert("inside validate "+this.firstFormGroup.controls['name'].value);
    
  }

  ngOnInit() {

    const path = this.route.snapshot.url[0].path;
    const vendorId = this.route.snapshot.url[1].path
    this.readOnly = "true";
    this.action = path;
    this.retrieveItems(vendorId);
   
  }

  modifyItem(val: string) {
    this.ngxService.start();
    for(let o of this.itemList){
      if(o._id == val){
        sessionStorage.setItem("item", JSON.stringify(o));
        this.router.navigate(['/updateItem/',val]);
      }
    }
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
    this.commonDataService.StateId = value.id;
    this.commonDataService.retrieveCities(value.id).subscribe(city =>{
      this.cities = this.commonDataService.Cities
    })
  }

  populatePlaces(value: City){
    this.commonDataService.CityId = value.id;
    this.commonDataService.retrievePlaces(value.id).subscribe(place =>{
      this.places = this.commonDataService.Places
    })
  }

  formSubmited() {
    const item: Item = this.generateItemObj();
    this.itemService.saveItem(item).subscribe(itemObj => {
      this.router.navigate(['/uploadImage']);
      
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

    item.placeId = this.firstFormGroup.controls['place'].value;
  //  item.type = this.firstFormGroup.controls['type'].value;
    
    itemDetails.name = this.firstFormGroup.controls['name'].value;
    itemDetails.address = this.firstFormGroup.controls['address'].value;
    itemDetails.mailId = this.firstFormGroup.controls['email'].value;
  //  itemDetails.contactNbr[0] = this.firstFormGroup.controls['contactNbr1'].value;
  //  itemDetails.contactNbr[1] = this.firstFormGroup.controls['contactNbr2'].value;
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