import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CarListComponent } from './components/car-list/car-list.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { BookingDetailsComponent } from './components/booking-details/booking-details.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatListModule, MatCardModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatToolbarModule, MatTabsModule} from '@angular/material';
import { CarInformationComponent } from './components/car-information/car-information.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CarListComponent,
    BookingListComponent,
    CarDetailsComponent,
    BookingDetailsComponent,
    CarInformationComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
