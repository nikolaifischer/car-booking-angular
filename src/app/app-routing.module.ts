import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';

/**
 * This module provides routing functionality to the app.
 */
const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'cars', component: CarListComponent},
  {path: 'bookings', component: BookingListComponent},
  {path: 'cars/details/:id', component: CarDetailsComponent},
  {path: 'bookings/details/:id', component: BookingDetailsComponent}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }