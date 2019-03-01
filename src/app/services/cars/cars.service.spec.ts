import { TestBed } from '@angular/core/testing';

import { CarsService } from './cars.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

let httpClientSpy: { get: jasmine.Spy };
let carsService: CarsService;
describe('CarsService', () => {
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    carsService = new CarsService(<any> httpClientSpy);
  });

  it('should be created', () => {
    expect(carsService).toBeTruthy();
  });

  it('should get a list of cars from the backend', () => {
     const expectedCars =  [
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
    httpClientSpy.get.and.returnValue(of(expectedCars));

    carsService.getCars().subscribe(cars => {
      expect(cars).toBeDefined();
      expect(cars.length).toBeGreaterThan(0);
      expect(cars[0].id).toBeDefined();
      expect(cars[0].name).toBeDefined();
    }, fail);
  });

  it('should get details for a specific car', () => {
    const expectedCarDetail = {
      'id': 4,
      'name': 'Kupferwerk vehicle',
      'shortDescription': 'Limousine',
      'description': 'Lorem ipsum dolor sit amet.',
      'image': 'images/hitech.jpg'
    };
    httpClientSpy.get.and.returnValue(of(expectedCarDetail));

    carsService.getCarById(4).subscribe(car => {
      expect(car).toBeDefined();
      expect(car.id).toBe(4, 'correct id');
      expect(car.image).toBe('images/hitech.jpg', 'correct image path');
      expect(car.name).toBe('Kupferwerk vehicle', 'correct name');
      expect(car.description).toBe('Lorem ipsum dolor sit amet.');
    }, fail);
  });

});
