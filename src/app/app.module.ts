import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatIconModule, MatButtonModule,
      MatCardModule, MatListModule, MatGridListModule, MatSidenavModule, 
      MatDialogModule, MatMenuModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
  MatInputModule, MatOptionModule, MatSelectModule, 
   MatCheckboxModule, MatRadioModule, MatStepperModule, MatTableModule,
    MatPaginatorModule, MatSortModule, MatBadgeModule } from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
//import {FileSelectDirective} from "ng2-file-upload";
//import { Ng2FileDropModule }  from 'ng2-file-drop';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NguCarouselModule } from '@ngu/carousel';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landingPage/landingPage.component';
import { TopCarouselComponent } from './topCarousel/topCarousel.component';
import { ItemDetailsComponent } from './itemDetails/itemDetails.component';
import { UserService } from './service/user.service';
import { ItemService } from './service/item.service';
import { ConstantsService } from './service/constants.service';
import { Item } from '../models/request-criteria/itemRetrieve-criteria';
import { User } from '../models/request-criteria/user';
import { ListingComponent } from './listing/listing.component';
import { AddItemComponent } from './addItem/addItem.component';
import { UpdateItemComponent } from './updateItem/updateItem.component';
import { ViewItemComponent } from './viewItem/viewItem.component';
import { SignupComponent } from './signup/signup.component';
import { SearchComponent } from './search/search.component';
import { CommonDataService } from './service/common-data.service';
import { BookingService } from './service/booking.service';
import { ImageUploadComponent } from './imageUpload/imageUpload.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingConfirmationComponent } from './bookingConfirmation/bookingConfirmation.component';

import { NgImageSliderModule } from 'ng-image-slider';
import { AngularCropperjsModule } from 'angular-cropperjs';
import {HttpClientModule} from '@angular/common/http';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { StarRatingModule } from 'angular-star-rating';
import { ToastrModule } from 'ngx-toastr';

import { State } from '../models/request-criteria/state';
import { DatePipe } from '@angular/common';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive'; // this includes the core NgIdleModule but includes keepalive providers for easy wireup

import { ModalService } from './service/modal.service';
import { NotificationModalComponent } from './components/notificationModal/notificationModal.component';

import { NavigationHeaderComponent} from './navigation/navigationHeader.component';
import { BookedListComponent } from './bookedList/bookedList.component';
import { BookedDetailsModalComponent } from './bookedList/bookedDetailsModal.component';
import { BookedUserModalComponent } from './bookedList/bookedUserModal.component';
import { VendorBookingComponent } from './vendorBooking/vendorBooking.component';
import { VendorBookingItemListComponent } from './vendorBooking/vendorBookingItemList.component';

import { ItemDetailsModalComponent } from './itemDetails/itemDetailsModal.component';
import { ProfileBookedItemListComponent } from './profile/profileBookedItemList.component';

import { NgxGalleryModule } from 'ngx-gallery';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { DeviceDetectorModule } from 'ngx-device-detector';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TopCarouselComponent,
    LoginComponent,
    LandingPageComponent,
    ItemDetailsComponent,
    ListingComponent,
    SignupComponent,
    AddItemComponent,
    UpdateItemComponent,
    ViewItemComponent,
    SearchComponent,
  //  FileSelectDirective,
    ImageUploadComponent,
    NotificationModalComponent,
    NavigationHeaderComponent,
    BookedListComponent,
    BookedDetailsModalComponent,
    BookedUserModalComponent,
    VendorBookingComponent,
    VendorBookingItemListComponent,
    ItemDetailsModalComponent,
    ProfileBookedItemListComponent,
    ProfileComponent,
    BookingConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NguCarouselModule,
    NgImageSliderModule,
    MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule,
      MatCardModule, MatListModule, MatGridListModule, MatDialogModule,
      MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule,
    AngularCropperjsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
    MatInputModule, MatOptionModule, MatSelectModule, MatStepperModule,
    MatCheckboxModule, MatRadioModule, MatBadgeModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
  //  Ng2FileDropModule,
    NgxSmartModalModule.forRoot(),
    NgIdleKeepaliveModule.forRoot(),
    StarRatingModule.forRoot(),
    ToastrModule.forRoot(),
    NgxGalleryModule,
    NgxUiLoaderModule,
    DeviceDetectorModule.forRoot()
  ],
  exports: [
    MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule,
      MatCardModule, MatListModule, 
      MatDatepickerModule, MatNativeDateModule, MatFormFieldModule,
    MatInputModule, MatOptionModule, MatSelectModule, MatStepperModule, MatBadgeModule, 
    MatSortModule, BrowserAnimationsModule
  ],
  providers: [UserService, CommonDataService, Item, ItemService,
    NgxSmartModalService, User, State, DatePipe, BookingService, ModalService, ConstantsService],
  bootstrap: [AppComponent],
  entryComponents: [BookedDetailsModalComponent, BookedUserModalComponent,NotificationModalComponent, 
    ItemDetailsModalComponent]
})
export class AppModule { }
