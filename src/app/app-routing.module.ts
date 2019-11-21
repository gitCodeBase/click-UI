import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landingPage/landingPage.component';
import { ItemDetailsComponent} from './itemDetails/itemDetails.component';
import { ListingComponent } from './listing/listing.component';
import { SignupComponent } from './signup/signup.component';
import { AddItemComponent } from './addItem/addItem.component';
import { UpdateItemComponent } from './updateItem/updateItem.component';
import { ViewItemComponent } from './viewItem/viewItem.component';
import { ImageUploadComponent } from './imageUpload/imageUpload.component';
import { BookedListComponent } from './bookedList/bookedList.component';
import { VendorBookingComponent } from './vendorBooking/vendorBooking.component';
import { VendorBookingItemListComponent } from './vendorBooking/vendorBookingItemList.component';
import { ProfileComponent } from './profile/profile.component';
import { BookingConfirmationComponent } from './bookingConfirmation/bookingConfirmation.component';
import { ProfileBookedItemListComponent } from './profile/profileBookedItemList.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
{path: 'login/:type', component: LoginComponent },
{path: 'home', component: LandingPageComponent},
{path: 'signup/:type', component: SignupComponent},
{path: 'itemDetails/:id', component: ItemDetailsComponent},
//{path: 'items/:type/:placeId', component: ItemListComponent},
{path: 'items/:type/:placeId', component: ListingComponent},
{path: 'search/:type', component: SearchComponent},
//{path: 'search/:type/:placeId', component: SearchPageComponent},
{path: 'addItem', component: AddItemComponent},
{path: 'updateItem/:itemId', component: UpdateItemComponent},
{path: 'viewItem/:vendorId', component: ViewItemComponent},
{path: 'uploadImage/:itemId', component: ImageUploadComponent},
{path: 'bookedList/:vendorId', component: BookedListComponent},
{path: 'vendorBookingItemList/:vendorId', component: VendorBookingItemListComponent},
{path: 'vendorBooking/:itemId', component: VendorBookingComponent},
{path: 'profile', component: ProfileComponent},
{path: 'bookingConfirmation', component: BookingConfirmationComponent},
{path: 'bookedDetails', component: ProfileBookedItemListComponent},
{path: '',  redirectTo: 'home', pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
