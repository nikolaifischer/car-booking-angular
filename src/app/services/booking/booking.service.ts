import { Injectable } from '@angular/core';
import { Booking } from 'src/app/models/booking';
import { Observable, of, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor() {
    // For prototype-presentation only:
    // Seeds old booking data to local storage
    this.getBookings().subscribe(bookings => {
      if (!bookings.length) {
        const seedBookings: Booking[] = [
          { startDate: new Date('04/02/2018 09:00'), endDate: new Date('04/05/2018'), carId: 1 }
        ];
        seedBookings.forEach(booking => this.addBooking(booking));
      }
    });
  }

  addBooking(booking: Booking): Observable<Booking[]> {
    let oldBookings: Booking[] = JSON.parse(localStorage.getItem('bookings'));
    if (!oldBookings) {
      oldBookings = [];
    }
    if (!booking.id) {
      booking.id = oldBookings.length;
    }
    oldBookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(oldBookings));
    return of(oldBookings);
  }

  getBookings(): Observable<Booking[]> {
    const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings'));
    if (!bookings) {
      return of([]);
    }
    // Construct real date objects from JSON.parser's returned date strings.
    bookings.forEach(booking => {
      booking.startDate = new Date(booking.startDate);
      booking.endDate = new Date(booking.endDate);
    });
    return of(bookings);
  }

  getBookingById(id): Observable<Booking> {
    // Local Storage does not allow get by booking id => get all and filter
    const bookings: Booking[] = JSON.parse(localStorage.getItem('bookings'));
    const foundBooking = bookings.find(booking => booking.id == id);
    if (!foundBooking) {
      //throw .throw({ error: 'No Booking found' });
      return throwError({ error: 'No Booking found' });
    }
    return of(foundBooking);
  }
}
