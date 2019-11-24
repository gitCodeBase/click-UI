import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonDataService } from '../service/common-data.service';
import { State, City } from 'src/models/request-criteria/state';
import { Item, ItemDetails, Amenities, Pricing } from 'src/models/request-criteria/itemRetrieve-criteria';
import { ItemService } from '../service/item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
/**
 * @title 
 */
@Component({
  selector: 'app-updateItem',
  templateUrl: './updateItem.component.html',
  styleUrls: ['./updateItem.component.css']
})
export class UpdateItemComponent implements OnInit {
 
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
  item: Item;
 
  constructor(private _formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute,
  private commonDataService: CommonDataService, private itemService: ItemService,
  private ngxService: NgxUiLoaderService) { }

  validateForm1() {
    alert("inside validate "+this.firstFormGroup.controls['name'].value);
    
  }

  ngOnInit() {
    this.item = new Item;
    this.ngxService.stop();
   
    this.firstFormGroup = this._formBuilder.group({
      name: '',
      type: '',
      address: '',
      state: '',
      city: '',
      place: '',
      email:'',
      contactNbr1: '',
      contactNbr2:''

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

    var itemString = sessionStorage.getItem("item");
    this.item = JSON.parse(itemString);
    if(this.item == null) {
      const itemId: string = this.route.snapshot.paramMap.get('itemId');
      this.retrieveItem(itemId);
    }

    this.readOnly = "false";
    
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

  modifyDetails() {
    const item: Item = this.generateItemObj();
    this.itemService.updateItem(item).subscribe(itemObj => {
      this.router.navigate(['/uploadImage']);
      
    })
  }

  retrieveItem(itemId: string) {
    this.itemService.retrieveItem(itemId).subscribe(itemObj => {
      this.item = this.commonDataService.Item;
    })
    
  }

  generateItemObj(): Item {

    var jj = this.item;
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