import { TestBed } from '@angular/core/testing';
import { BookingService } from './booking.service';
import { Booking } from 'src/app/models/booking';

/**
 * Unit Tests for Booking Service
 */
let service: BookingService;
describe('BookingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(BookingService);
    localStorage.clear();
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

  it('should add bookings to local storage', () => {
    service.addBooking({ 'id': 3, 'carId': 1, 'startDate': new Date('2/2/2019'), 'endDate': new Date('2/3/2019') });
    const expected = JSON.stringify([{ 'id': 3, 'carId': 1, 'startDate': new Date('2/2/2019'), 'endDate': new Date('2/3/2019') }]);
    const actual = localStorage.getItem('bookings');
    expect(actual).toEqual(expected);
  });
  it('should get bookings from local storage', () => {
    const item = JSON.stringify([{ 'id': 3, 'carId': 1, 'startDate': new Date('2/2/2019'), 'endDate': new Date('2/3/2019') }]);
    localStorage.setItem('bookings', item);
    const expected: Booking[] = [{ 'id': 3, 'carId': 1, 'startDate': new Date('2/2/2019'), 'endDate': new Date('2/3/2019') }];
    service.getBookings().subscribe(bookings => {
      const actual = bookings;
      expect(actual).toEqual(expected);
    });
      });
});
