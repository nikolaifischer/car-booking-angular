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
/**
 * Component that shows Details of a booking including the selected car.
 */
export class BookingDetailsComponent implements OnInit {

  // Template Flags
  showNoBookingError = false;
  showNoCarError = false;

  // Models
  car: CarDetail;
  booking: Booking;

  constructor(private bookingService: BookingService, private carService: CarsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadBookingAndCar();
  }

  /**
   * Loads Booking and Car Object from the Service. ID of the booking is determined by the url parameter.
   */
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
