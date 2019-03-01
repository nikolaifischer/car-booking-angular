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
export class BookingListComponent implements OnInit {

  upcomingBookings: Booking[];
  oldBookings: Booking[];
  cars: CarDetail[];
  carLookUp = new Map<Booking, CarDetail>();

  constructor(private bookingService: BookingService, private carService: CarsService) { }

  ngOnInit() {
    this.loadBookings();
    this.loadCars();
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe(bookings => {
      this.upcomingBookings = this.filterBookings (bookings, true);
      this.oldBookings = this.filterBookings (bookings, false);

    });
  }

  loadCars() {
    const allBookings = [...this.upcomingBookings, ...this.oldBookings];
    allBookings.forEach(booking => {
      this.carService.getCarById(booking.carId).subscribe(car => {
        this.carLookUp.set(booking, car);
      });
    });
  }

  getCarForBooking(booking: Booking): CarDetail {
    return this.carLookUp.get(booking);
  }

  // ToDo: Test
  filterBookings(bookings: Booking [], upcoming: boolean): Booking [] {
    let filtered: Booking [];
    if (upcoming) {
      filtered = bookings.filter(booking => booking.endDate >= new Date());
    } else {
      filtered = bookings.filter(booking => booking.endDate < new Date());
    }
    return filtered;
  }

}
