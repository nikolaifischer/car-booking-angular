import { fakeAsync, flushMicrotasks } from '@angular/core/testing';
import { BookingListComponent } from './booking-list.component';
import { Booking } from 'src/app/models/booking';
import { of } from 'rxjs';
import { CarDetail } from 'src/app/models/carDetail';

/**
 * Unit Tests for BookingListComponent
 */
describe('BookingListComponent', () => {
  let component: BookingListComponent;

  // Objects for simulated service calls by stubs:
  const addBookingStubValue: Booking = {
    id: 1,
    startDate: new Date('04/04/2220 13:00'),
    endDate: new Date('04/05/2220 13:00'),
    carId: 2
  };
  const getBookingsStubValue: Booking[] = [
    {
      id: 1,
      startDate: new Date('04/04/2220 13:00'),
      endDate: new Date('04/05/2220 13:00'),
      carId: 3
    },
    {
      id: 2,
      startDate: new Date('03/04/2017 13:00'),
      endDate: new Date('03/06/2017 13:00'),
      carId: 3
    }
  ];

  const getCarStubValue = {
    'id': 3,
    'name': 'The intive_Kupferwerk car',
    'shortDescription': 'Transporter',
    'description': 'Lorem ipsum dolor sit amet.',
    'image': 'images/healthcare.jpg'
  };

  beforeEach(() => {
    const bookingServiceSpy = jasmine.createSpyObj('BookingService', ['getBookings']);
    bookingServiceSpy.getBookings.and.returnValue(of(getBookingsStubValue));
    const carServiceSpy = jasmine.createSpyObj('CarService', ['getCarById']);
    carServiceSpy.getCarById.and.returnValue(of(getCarStubValue));
    component = new BookingListComponent(bookingServiceSpy, carServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load bookings from the booking service', fakeAsync(() => {
    component.ngOnInit();
    flushMicrotasks();

    const expected: Booking[] = getBookingsStubValue;
    const actual: Booking[] = Array.from(component.carLookUp.keys());

    expect(actual).toEqual(expected);
  }));

  it('should load cars from the car service', fakeAsync(() => {
    component.ngOnInit();
    flushMicrotasks();

    const expected: CarDetail = getCarStubValue;
    const actual: CarDetail = component.carLookUp.get(getBookingsStubValue[0]);

    expect(actual).toEqual(expected);
  }));

  it('should create a lookup map of correct length', fakeAsync(() => {
    component.ngOnInit();
    flushMicrotasks();

    const expected = getBookingsStubValue.length;
    const actual = Array.from(component.carLookUp.keys()).length;

    expect(actual).toBe(expected);
  }));

  it('should lookup the correct car for a booking', fakeAsync(() => {
    component.ngOnInit();
    flushMicrotasks();

    const expected = getCarStubValue;
    const actual = component.getCarForBooking(getBookingsStubValue[0]);

    expect(actual).toEqual(expected);

  }));

  it('should filter bookings for upcoming dates', () => {
    const expected = [getBookingsStubValue[0]];
    const actual = component.filterBookings(getBookingsStubValue, true);

    expect(actual).toEqual(expected);
  });

  it('should filter bookings for past dates', () => {
    const expected = [getBookingsStubValue[1]];
    const actual = component.filterBookings(getBookingsStubValue, false);

    expect(actual).toEqual(expected);
  });
});
