import { async, ComponentFixture, TestBed, flushMicrotasks, fakeAsync } from '@angular/core/testing';

import { BookingDetailsComponent } from './booking-details.component';
import { MatCardModule } from '@angular/material';
import { CarInformationComponent } from '../car-information/car-information.component';
import { of } from 'rxjs';
import { CarDetail } from 'src/app/models/carDetail';
import { Booking } from 'src/app/models/booking';

describe('BookingDetailsComponent', () => {
  let component: BookingDetailsComponent;
  const getCarStubValue: CarDetail = {
    'id': 3,
    'name': 'The intive_Kupferwerk car',
    'shortDescription': 'Transporter',
    'description': 'Lorem ipsum dolor sit amet.',
    'image': 'images/healthcare.jpg'
    };
    const getBookingByIdStubValue: Booking  = {
      id: 1,
      startDate: new Date('04/04/2020 13:00'),
      endDate: new Date('04/05/2020 13:00' ),
      carId: 3
    };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingDetailsComponent, CarInformationComponent ],
      imports: [MatCardModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const carServiceSpy = jasmine.createSpyObj('CarService', ['getCarById']);
    carServiceSpy.getCarById.and.returnValue(of(getCarStubValue));
    const bookingServiceSpy = jasmine.createSpyObj('BookingService', ['getBooking', 'getBookingById']);
    bookingServiceSpy.getBooking.and.returnValue(of(getBookingByIdStubValue));
    bookingServiceSpy.getBookingById.and.returnValue(of(getBookingByIdStubValue));
    const activatedRouteSpy =  {params: of({id: 1})} as any;
    component = new BookingDetailsComponent(bookingServiceSpy, carServiceSpy, activatedRouteSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load a car from the car service', fakeAsync(() => {
    component.ngOnInit();
    flushMicrotasks();

    const expected = getCarStubValue;
    const actual = component.car;

    expect(actual).toEqual(expected);
  }));

  it('should load a booking from the booking service', fakeAsync(() => {
    component.ngOnInit();
    flushMicrotasks();

    const expected = getBookingByIdStubValue;
    const actual = component.booking;

    expect(actual).toEqual(expected);
  }));
});
