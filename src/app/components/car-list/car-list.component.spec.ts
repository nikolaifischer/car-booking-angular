import { async, ComponentFixture, TestBed, flushMicrotasks, fakeAsync } from '@angular/core/testing';

import { CarListComponent } from './car-list.component';
import { MatCardModule } from '@angular/material';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('CarListComponent', () => {
  let component: CarListComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarListComponent],
      imports: [MatCardModule, RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    // Mock the Car Service with a Spy
    const carServiceSpy = jasmine.createSpyObj('CarService', ['getCars']);
    const stubValue = [
      {
        'id': 3,
        'name': 'The intive_Kupferwerk car',
        'shortDescription': 'Transporter'
      },
      {
        'id': 1,
        'name': 'intive_Kupferwerk 1',
        'shortDescription': 'Limousine with 5 Seats'
      },
      {
        'id': 2,
        'name': 'intive_Kupferwerk car 2',
        'shortDescription': '2 seated car'
      }
    ];
    carServiceSpy.getCars.and.returnValue(of(stubValue));
    component = new CarListComponent(carServiceSpy);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get cars from service', fakeAsync(() => {
    component.ngOnInit();
    flushMicrotasks();
    expect(component.cars.length).toBe(3, 'correct length');
    expect(component.cars[0]).toBeDefined();
    expect(component.cars[0].name).toBe('intive_Kupferwerk 1', 'the correct first object');
    expect(component.cars[0].id).toBe(1, 'the correct id');
    expect(component.cars[0].shortDescription).toBe('Limousine with 5 Seats', 'the correct short description');
  }));

  it('should sort cars by name', () => {
    const givenCars = [
      {
        'id': 3,
        'name': 'Bus',
        'shortDescription': 'Transporter'
      },
      {
        'id': 1,
        'name': 'Car',
        'shortDescription': 'Limousine with 5 Seats'
      },
      {
        'id': 4,
        'name': 'Car3',
        'shortDescription': 'Limousine with 42 Seats'
      },
      {
        'id': 2,
        'name': 'A great Car',
        'shortDescription': '2 seated car'
      }
    ];

    const expected = [
      {
        'id': 2,
        'name': 'A great Car',
        'shortDescription': '2 seated car'
      },
      {
        'id': 3,
        'name': 'Bus',
        'shortDescription': 'Transporter'
      },
      {
        'id': 1,
        'name': 'Car',
        'shortDescription': 'Limousine with 5 Seats'
      },
      {
        'id': 4,
        'name': 'Car3',
        'shortDescription': 'Limousine with 42 Seats'
      }
    ];

    const actual = component.sortCars(givenCars);
    expect(actual).toEqual(expected);
  });
});
