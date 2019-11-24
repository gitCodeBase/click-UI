import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../service/common-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Item } from 'src/models/request-criteria/itemRetrieve-criteria';
import { ConstantsService } from '../service/constants.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { State, City, Place } from 'src/models/request-criteria/state';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit{
  
  /*private*/ itemList: Item[];
  place: string;
  typeId: string;
  placeId: string;
  searchForm1: FormGroup;
  states = String[14];
  cities = String[50];
  places = String[50];
  placeSelected: Place;
  state1: State;
  modifyFlag: string;
  mainImageUrl: string;
  
  constructor(private commonDataService: CommonDataService, private constantsService: ConstantsService,
    private router: Router, private route: ActivatedRoute, private fromBuilder: FormBuilder,
    private itemService: ItemService, private ngxService: NgxUiLoaderService) { 

      route.params.subscribe(val => {

        this.typeId = this.route.snapshot.paramMap.get('type');
        this.placeId = this.route.snapshot.paramMap.get('placeId');
        
        const item: Item = new Item();
        item.placeId = this.placeId;
        item.type = this.typeId;

        this.itemService.retrieveItems(item).subscribe(state =>{
          this.itemList = this.commonDataService.ItemList;
          if(this.itemList != null && this.itemList.length > 0){
            var item1 = this.itemList[0];
            this.place = item1.details.place;
           // if(item1.images != undefined || item1.images != null) {
           //    this.mainImageUrl = 'http://localhost:8080/api/item/image/retrieve/'+item1.images[0].fileName+'/';
           // }
        }
        this.ngxService.stop();
        })
      });
    }

  ngOnInit() {

    var stateSession = sessionStorage.getItem("state");
    var stateSessionObj: State = JSON.parse(stateSession);
    this.commonDataService.State.id = stateSessionObj.id;
    this.commonDataService.State.name = stateSessionObj.name;

    this.modifyFlag = 'false';

 /*   var citySession = sessionStorage.getItem("city");
    var citySessionObj: City = JSON.parse(citySession);
    this.commonDataService.City.id = citySessionObj.id;
    this.commonDataService.City.name = citySessionObj.name;*/
    
   /* this.states = this.commonDataService.StatesList;
    if(this.states == undefined || this.states == null) {
      this.commonDataService.retrieveStates().subscribe(state =>{
        this.states = this.commonDataService.StatesList
      })
    }*/
    this.searchForm1 = this.fromBuilder.group({
 
     //  state: this.commonDataService.State,
     state:'',
       city: '',
       place: ''
    });
    window.scroll(0,0);
   }
   
  editSearch() {
    this.modifyFlag = 'true';
    this.states = this.commonDataService.StatesList;
    if(this.states == undefined || this.states == null) {
      this.commonDataService.retrieveStates().subscribe(state =>{
        this.states = this.commonDataService.StatesList
      })
    }
  }

  modifySearch() {
    this.router.navigate(['/items',this.typeId, this.placeSelected.id]);
  }
    
  getItemDetails(value: string) {
     
    for(let o of this.commonDataService.ItemList){
      if(o._id == value){
        this.router.navigate(['/itemDetails/',value]);
      }
    }
  }

  populateCity(value: State) {
    this.commonDataService.StateId = value.id;
    sessionStorage.setItem("stateId", value.id);
    this.commonDataService.retrieveCities(value.id).subscribe(city =>{
      this.cities = this.commonDataService.Cities;
    })
  }

  populatePlaces(value: City){
    this.commonDataService.CityId = value.id;
    sessionStorage.setItem("cityId", value.id);
    this.commonDataService.retrievePlaces(value.id).subscribe(place =>{
      this.places = this.commonDataService.Places;
    })
  }

  loadMainImage(imageName: string) {
    this.mainImageUrl = 'http://localhost:8080/api/item/image/retrieve/'+imageName+'/';
          
  }

  
}
