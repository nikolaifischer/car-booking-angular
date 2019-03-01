import { Component, OnInit, Input } from '@angular/core';
import { Booking } from 'src/app/models/booking';
import { CarDetail } from 'src/app/models/carDetail';
import { BookingService } from 'src/app/services/booking/booking.service';
import { CarsService } from 'src/app/services/cars/cars.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent implements OnInit {

  showNoBookingError = false;
  showNoCarError = false;
  car: CarDetail;
  booking: Booking;
  id: number;
  constructor(private bookingService: BookingService, private carService: CarsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadBookingAndCar();
  }

  loadBookingAndCar() {
    this.route.params.subscribe(params => {
      const bookingId = params['id'];
      this.bookingService.getBookingById(bookingId).subscribe(booking => {
        this.booking = booking;
        this.carService.getCarById(this.booking.carId).subscribe(car => {
          this.car = car;
        }, (error) => {
          this.showNoCarError = true;
          console.error(error);
        });
      }, (error) => {
        this.showNoBookingError = true;
        console.error(error);
      });
    });
  }



}
