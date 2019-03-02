import { Component, OnInit } from '@angular/core';
import { Booking } from 'src/app/models/booking';
import { BookingService } from 'src/app/services/booking/booking.service';
import { CarDetail } from 'src/app/models/carDetail';
import { CarsService } from 'src/app/services/cars/cars.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
/**
 * Component that shows all upcoming and past bookings.
 */
export class BookingListComponent implements OnInit {

  // Models
  upcomingBookings: Booking[];
  oldBookings: Booking[];

  // Lookup Map: Allows quick lookup of a car for each booking.
  carLookUp = new Map<Booking, CarDetail>();

  constructor(private bookingService: BookingService, private carService: CarsService) { }

  ngOnInit() {
    this.loadBookings();
    this.loadCars();
  }

  /**
   * Loads Bookings from the service and starts upcoming/old filtering process
   */
  loadBookings() {
    this.bookingService.getBookings().subscribe(bookings => {
      this.upcomingBookings = this.filterBookings(bookings, true);
      this.oldBookings = this.filterBookings(bookings, false);

    });
  }

  /**
   * Loads the car for each booking and adds it to the Lookup Map. Has to be called after the bookings are fetched.
   */
  loadCars() {
    if (this.upcomingBookings === undefined || this.oldBookings === undefined) {
      return;
    }
    const allBookings = [...this.upcomingBookings, ...this.oldBookings];
    allBookings.forEach(booking => {
      this.carService.getCarById(booking.carId).subscribe(car => {
        this.carLookUp.set(booking, car);
      });
    });
  }

  /**
   * Gets the corresponding car for a booking from lookup map.
   * @param booking The booking for which the car is wanted.
   */
  getCarForBooking(booking: Booking): CarDetail {
    return this.carLookUp.get(booking);
  }

  /**
   * Filters an Array of booking by date into upcoming of past bookings.
   * @param bookings the bookings to be filtered
   * @param upcoming whether all upcoming (true) bookings or past (false) bookings should be returned.
   */
  filterBookings(bookings: Booking[], upcoming: boolean): Booking[] {
    let filtered: Booking[];
    if (upcoming) {
      filtered = bookings.filter(booking => booking.endDate >= new Date());
    } else {
      filtered = bookings.filter(booking => booking.endDate < new Date());
    }
    return filtered;
  }

}
