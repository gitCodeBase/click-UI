import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonDataService } from '../service/common-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Item, ItemDetails } from 'src/models/request-criteria/itemRetrieve-criteria';
import { BookingService } from '../service/booking.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Booking } from 'src/models/request-criteria/booking';


@Component({
  selector: 'app-profileBookedItemList',
  templateUrl: './profileBookedItemList.component.html',
  styleUrls: ['./profileBookedItemList.component.css']
})
export class ProfileBookedItemListComponent implements OnInit, AfterViewInit{
  
  displayedColumns = ['name', 'bookingFromDate', 'bookingToDate', 'amtCollected', 'createdOn'];
  dataSource: MatTableDataSource<Booking>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private commonDataService: CommonDataService, private bookingService: BookingService,
    private router: Router, private route: ActivatedRoute,
    private itemService: ItemService) { }
  
  ngOnInit() {
    var userId = sessionStorage.getItem("userId");

    this.bookingService.retrieveUserBookedDetails(userId).subscribe(bookedObj =>{
      if(this.commonDataService.BookedItems != null) {
        this.dataSource = new MatTableDataSource(this.commonDataService.BookedItems);
        this.dataSource.sort = this.sort;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  retrieveItem(itemId: string) {
     
      for(let o of this.commonDataService.ItemList){
        if(o._id == itemId){
          this.commonDataService.Item = o;
          this.router.navigate(['/vendorBooking/',itemId]);
        }
      }
    }

  
}
