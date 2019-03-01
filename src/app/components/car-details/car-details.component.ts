import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars/cars.service';
import { CarDetail } from 'src/app/models/carDetail';
import { ActivatedRoute } from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Booking } from 'src/app/models/booking';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {

  showCar = true;
  dateInvalid = false;
  dateInThePast = false;
  car: CarDetail;
  id: number;
  startDate: Date;
  endDate: Date = new Date();
  minDate: Date = new Date();
  duration: number;
  firstFormGroup: FormGroup; // ToDo: Umbenennen
  secondFormGroup: FormGroup;
  startDateFormControl = new FormControl(this.startDate);
  constructor(private carService: CarsService, private bookingService: BookingService,
     private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loadCarDetails();
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    currentDate.setHours(9);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    this.startDate = new Date(currentDate);
    this.duration = 1;
    this.endDate = this.calculateEndDate(this.startDate, this.duration);
  }

  loadCarDetails() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.carService.getCarById(this.id).subscribe( car => {
        this.car = car;
        console.log(car);
      });
      });
  }

  onChangeDate(pickedDate: Date) {

    if ( !pickedDate || !(pickedDate instanceof Date)) {
      this.dateInvalid = true;
      return;
    }
    this.dateInvalid = false;
    if (pickedDate < new Date()) {
      this.dateInThePast = true;
      return;
    }
    this.dateInThePast = false;
    // angular does not detect changes to a date obj => switch for 'new' date
    const updatedDate = new Date(this.startDate);
    updatedDate.setDate(pickedDate.getDate());
    updatedDate.setMonth(pickedDate.getMonth());
    updatedDate.setFullYear(pickedDate.getFullYear());
    this.startDate = updatedDate;
    this.endDate = this.calculateEndDate(this.startDate, this.duration);
  }

  onChangeStartTime(value) {
    this.startDate = this.changeTimeOfDay(this.startDate, value);
    this.endDate = this.calculateEndDate(this.startDate, this.duration);
  }

  onChangeDuration(value) {
    this.duration = value;
    this.endDate = this.calculateEndDate(this.startDate, this.duration);
  }

  onBookNow() {
    this.showCar = false;
    window.scroll(0, 0);
  }

  onConfirmBooking() {
    const booking: Booking = {startDate: this.startDate, endDate: this.endDate, carId: this.car.id};
    this.bookingService.addBooking(booking).subscribe( _ => {
      const router = Router;
      this.router.navigateByUrl('/bookings');
    });
  }

  calculateEndDate(startDate: Date, duration: number): Date {
    const DAY_IN_MS = 86400000;
    const endDate = new Date(startDate);
    endDate.setTime(startDate.getTime() + duration * DAY_IN_MS);
    return endDate;
  }

  changeTimeOfDay(oldDate: Date, time: string): Date {
    const date = new Date(oldDate);
    const timeArr = time.split(':');
    const hours = timeArr[0];
    const minutes = timeArr [1];
    date.setHours(Number.parseInt(hours, 10));
    date.setMinutes(Number.parseInt(minutes, 10));
    return date;
  }

}
