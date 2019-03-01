import { async, ComponentFixture, TestBed, flushMicrotasks, fakeAsync } from '@angular/core/testing';

import { CarDetailsComponent } from './car-details.component';
import { of } from 'rxjs';
import { CarInformationComponent } from '../car-information/car-information.component';
import {  MatCardModule, MatStepperModule, MatFormFieldModule, MatInputModule,
          MatNativeDateModule, MatDatepickerModule } from '@angular/material';
import {Router} from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Booking } from 'src/app/models/booking';

describe('CarDetailsComponent', () => {
  let component: CarDetailsComponent;
  const getCarStubValue = {
    'id': 3,
    'name': 'The intive_Kupferwerk car',
    'shortDescription': 'Transporter',
    'description': 'Lorem ipsum dolor sit amet.',
    'image': 'images/healthcare.jpg'
    };
  const addBookingStubValue: Booking  = {
    id: 1,
    startDate: new Date('04/04/2020 13:00'),
    endDate: new Date('04/05/2020 13:00' ),
    carId: 2
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarDetailsComponent, CarInformationComponent ],
      imports: [ReactiveFormsModule, MatCardModule, MatStepperModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
        MatNativeDateModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const carServiceSpy = jasmine.createSpyObj('CarService', ['getCarById']);
    carServiceSpy.getCarById.and.returnValue(of(getCarStubValue));
    const bookingServiceSpy = jasmine.createSpyObj('BookingService', ['addBooking']);
    bookingServiceSpy.addBooking.and.returnValue(of(addBookingStubValue));
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    routerSpy.navigateByUrl.and.returnValue();
    const activatedRouteSpy =  {params: of({id: 3})} as any;
    const formBuilder = new FormBuilder();
    component = new CarDetailsComponent(carServiceSpy, bookingServiceSpy, activatedRouteSpy, formBuilder, routerSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load car details', fakeAsync (() => {
    component.ngOnInit();
    flushMicrotasks();
    expect(component.car).toEqual(getCarStubValue, 'correct car details');
    expect(component.car.id).toBe(3);
  }));

  it('should calculate a correct end date', () => {
    const givenStartDate = new Date('01/01/2022');
    const givenDuration = 4;

    const expected = new Date('01/05/2022');
    const actual = component.calculateEndDate(givenStartDate, givenDuration);

    expect(actual).toEqual(expected);
  });

  it('should change the time in the day', () => {
    const givenStartDate = new Date('01/01/2022 13:13');
    const givenTime = '14:00';

    const expected = new Date('01/01/2022 14:00');
    const actual = component.changeTimeOfDay(givenStartDate, givenTime);

    expect(actual).toEqual(expected);
  });
});


