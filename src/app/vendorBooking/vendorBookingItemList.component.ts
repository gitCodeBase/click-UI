import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonDataService } from '../service/common-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../service/item.service';
import { Item, ItemDetails } from 'src/models/request-criteria/itemRetrieve-criteria';
import { BookingService } from '../service/booking.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Booking } from 'src/models/request-criteria/booking';


@Component({
  selector: 'app-vendorBookingItemList',
  templateUrl: './vendorBookingItemList.component.html',
  styleUrls: ['./vendorBookingItemList.component.css']
})
export class VendorBookingItemListComponent implements OnInit, AfterViewInit{
  
  displayedColumns = ['name', 'address'];
  dataSource: MatTableDataSource<Item>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(private commonDataService: CommonDataService,
    private router: Router, private route: ActivatedRoute,
    private itemService: ItemService) { }
  
  ngOnInit() {
    const vendorId: string = this.route.snapshot.paramMap.get('vendorId');

    this.itemService.retrieveItemsBasedOnVendor(vendorId).subscribe(itemObj => {
      this.dataSource = new MatTableDataSource(this.commonDataService.ItemList);
      this.dataSource.sort = this.sort;
    })
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
