import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars/cars.service';
import { CarSimple } from 'src/app/models/carSimple';
import { CarDetail } from 'src/app/models/carDetail';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  cars: CarSimple [];
  constructor(private carsService: CarsService) { }

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    this.carsService.getCars().subscribe(cars => {
       this.cars = this.sortCars(cars);
    }, error => {
      this.cars = [];
    });
  }

  sortCars (cars: CarSimple[]): CarSimple[] {
    return cars.sort((elementA, elementB) => {
      if (elementA.name.toUpperCase() < elementB.name.toUpperCase()) {
        return -1;
      }
      if (elementA.name.toUpperCase() > elementA.name.toUpperCase()) {
        return 1;
      }
      return 0;
    });
  }

  onViewCarDetails(id: number) {
    
  }

}
