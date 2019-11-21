import { Component, OnInit } from '@angular/core';
import { CommonDataService } from '../service/common-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { State, City, Place } from 'src/models/request-criteria/state';
import {FormBuilder, FormGroup} from '@angular/forms';
import { ConstantsService } from '../service/constants.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-searchPage',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchForm: FormGroup;
  typeSelected: string;
  type: string;
  stateSelected: State;
  citySelected: City;
  placeSelected: Place;
  states = String[14];
  cities = String[50];
  places = String[50];
  placeId: string;
  place: string;
  state: string;
  city: string;
  clickedSearch: boolean = true;
  
  constructor(private commonDataService: CommonDataService, private constantsService: ConstantsService,
    private router: Router, private fromBuilder: FormBuilder, private toastr: ToastrService,
    private route: ActivatedRoute, private ngxService: NgxUiLoaderService) { 
      route.params.subscribe(val => {
        this.typeSelected = this.route.snapshot.paramMap.get('type');
        this.type = this.constantsService.getItemType(this.typeSelected);

        const selectedPlace = this.route.snapshot.paramMap.get('placeId');

        this.commonDataService.StateId = null;
        sessionStorage.removeItem("state");
        sessionStorage.removeItem("stateId");
        this.cities = null;
        this.places = null;
        this.stateSelected = null;
        this.placeSelected = undefined;

        /*if(selectedPlace != null){
          const stateId = sessionStorage.getItem("stateId");
          const cityId = sessionStorage.getItem("cityId");
          var stateObj = new State();
          stateObj.id = stateId;
          this.cities = this.populateCity(stateObj);
          
          this.stateSelected = stateObj;
          var cityObj = new City();
          cityObj.id = cityId;
          cityObj.name = "Trivandrum";
          this.citySelected = cityObj;

        //  this.placeSelected.id = selectedPlace
        }*/
      });
  }
  
  ngOnInit() {
    
    this.commonDataService.retrieveStates().subscribe(state =>{
      this.states = this.commonDataService.StatesList
    })
    this.searchForm = this.fromBuilder.group({
 
       state: '',
       city: '',
       place: ''
    });
  }

  ngAfterViewInit() {
    this.ngxService.stop();
  }

  populateCity(value: State) {
    this.clickedSearch = true;
    this.places = null;
    this.placeSelected = undefined;
    if(value != undefined || value != null) {
      this.commonDataService.StateId = value.id;
      sessionStorage.setItem("state", JSON.stringify(value));
      sessionStorage.setItem("stateId", value.id);
      this.commonDataService.retrieveCities(value.id).subscribe(city =>{
        this.cities = this.commonDataService.Cities;
      })
    } else {
      this.commonDataService.StateId = null;
      sessionStorage.removeItem("state");
      sessionStorage.removeItem("stateId");
      this.cities = null;
    }
  }

  populatePlaces(value: City) {
    this.clickedSearch = true;
    if(value != undefined || value != null) {
      this.commonDataService.CityId = value.id;
      sessionStorage.setItem("cityId", value.id);
      this.commonDataService.retrievePlaces(value.id).subscribe(place =>{
        this.places = this.commonDataService.Places;
      })
    } else {
      this.commonDataService.CityId = null;
      sessionStorage.removeItem("cityId");
      this.places = null;
      this.placeSelected = undefined;
    }
  }

  placeChange(value:Place) {
    if(value != undefined) {
      this.clickedSearch = false;
    } else {
      this.clickedSearch = true;
    }
  }
  

  searchItems() {
    this.ngxService.start();
    this.type = this.constantsService.getItemType(this.typeSelected);
    if(this.type == undefined || this.type == null) {
      this.toastr.error('Experiencing some technical issues. Please try again!', 'Error!',{
        disableTimeOut:false
      });
      this.router.navigate(['/home']);
    } else if(this.placeSelected == undefined || this.placeSelected.id == null){
      this.toastr.error('Please select a place!', 'Place required!',{
        disableTimeOut:false
      });
    } else {
      this.router.navigate(['/items',this.type, this.placeSelected.id]);
    }
  }

}
