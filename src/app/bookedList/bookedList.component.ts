import {Component, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import { BookingService } from '../service/booking.service';
import { CommonDataService } from '../service/common-data.service';
import { ActivatedRoute } from '@angular/router';
import { Booking } from 'src/models/request-criteria/booking';
import { BookedDetailsModalComponent } from './bookedDetailsModal.component';
import { UserService } from '../service/user.service';
import { BookedUserModalComponent } from './bookedUserModal.component';

/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-bookedList',
  styleUrls: ['bookedList.component.css'],
  templateUrl: 'bookedList.component.html',
})
export class BookedListComponent {
  displayedColumns = ['itemId', 'bookingFromDate', 'bookingToDate', 'type', 'customer'];
  dataSource: MatTableDataSource<Booking>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private bookingService: BookingService, 
    private commonDataService: CommonDataService, private route: ActivatedRoute, 
    public dialog: MatDialog, private userService: UserService) {

    const vendorId = this.route.snapshot.url[1].path
    this.bookingService.retrieveBookedItems(vendorId).subscribe(item =>{
      const kk = this.commonDataService.BookedItems;
      this.dataSource = new MatTableDataSource(this.commonDataService.BookedItems);
    //  this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
   })

    // Assign the data to the data source for the table to render
  //  this.dataSource = new MatTableDataSource(users);
  }

  openDialog(bookedId: string): void {

    this.bookingService.retrieveBookedItemsBasedOn(bookedId).subscribe(state =>{
      let dialogRef = this.dialog.open(BookedDetailsModalComponent, {
        width: '650px',
        data: this.commonDataService.BookedItemsDetails
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    })
  }

  openCustomerDialog(userId: string): void {

      this.userService.retrieveUserDetails(userId).subscribe(user =>{
        let dialogRef = this.dialog.open(BookedUserModalComponent, {
          width: '650px',
          data: this.commonDataService.User
        });
    
        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
      })
    }
  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
   // this.dataSource.paginator = this.paginator;
  //  this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
