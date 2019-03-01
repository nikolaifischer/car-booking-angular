import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingListComponent } from './booking-list.component';
import { MatListModule } from '@angular/material';
import { Booking } from 'src/app/models/booking';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('BookingListComponent', () => {
  let component: BookingListComponent;
  const addBookingStubValue: Booking  = {
    id: 1,
    startDate: new Date('04/04/2020 13:00'),
    endDate: new Date('04/05/2020 13:00' ),
    carId: 2
  };
  const getCarStubValue = {
    'id': 3,
    'name': 'The intive_Kupferwerk car',
    'shortDescription': 'Transporter',
    'description': 'Lorem ipsum dolor sit amet.',
    'image': 'images/healthcare.jpg'
    };
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ BookingListComponent],
      imports: [MatListModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const bookingServiceSpy = jasmine.createSpyObj('BookingService', ['addBooking']);
    bookingServiceSpy.addBooking.and.returnValue(of(addBookingStubValue));
    const carServiceSpy = jasmine.createSpyObj('CarService', ['getCarById']);
    carServiceSpy.getCarById.and.returnValue(of(getCarStubValue));
    component = new BookingListComponent(bookingServiceSpy, carServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
