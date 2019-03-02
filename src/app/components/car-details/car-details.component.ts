import { Component, OnInit } from '@angular/core';
import { CarsService } from 'src/app/services/cars/cars.service';
import { CarDetail } from 'src/app/models/carDetail';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { BookingService } from 'src/app/services/booking/booking.service';
import { Booking } from 'src/app/models/booking';
import { AppSettings } from 'src/app/app.settings';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
/**
 * Component to display details for a car and booking dialog.
 */
export class CarDetailsComponent implements OnInit {

  // Display Flags
  showCar = true;
  showNoCarError = false;

  // Input Error Flags
  dateInvalid = false;
  dateInThePast = false;

  // Models
  car: CarDetail;
  startDate: Date;
  endDate: Date;
  duration: number = AppSettings.DEFAULT_BOOKING_DURATION;

  // Form Controls
  startDateFormGroup: FormGroup;
  durationFormGroup: FormGroup;
  startDateFormControl = new FormControl(this.startDate);

  constructor(private carService: CarsService, private bookingService: BookingService,
    private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loadCarDetails();

    // Init Dates
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + AppSettings.DEFAULT_START_DATE_OFFSET);
    currentDate.setHours(AppSettings.DEFAULT_START_TIME_HOURS);
    currentDate.setMinutes(AppSettings.DEFAULT_START_TIME_MINUTES);
    currentDate.setSeconds(AppSettings.DEFAULT_START_TIME_SECONDS);
    this.startDate = new Date(currentDate);
    this.endDate = this.calculateEndDate(this.startDate, this.duration);

    // Init Form Groups
    this.startDateFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.durationFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  /**
   * Loads the car's details from the service. The Car's ID is extracted from the route
   */
  loadCarDetails() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.carService.getCarById(id).subscribe(car => {
        this.car = car;
      }, (error) => {
        this.showNoCarError = true;
        console.error(error);
      });
    });
  }

  /**
   * Event Hook: User changed date in date picker.
   * Executes Error Checks and calculates new end Date
   * @param pickedDate the date the user picked
   */
  onChangeDate(pickedDate: Date) {

    if (!pickedDate || !(pickedDate instanceof Date)) {
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
    // endDate has to be updated to reflect changes in start date.
    this.endDate = this.calculateEndDate(this.startDate, this.duration);
  }

  /**
   * Event Hook: User changed start time in time picker.
   * Calculates new End Date
   * @param time  the time the user picked.
   */
  onChangeStartTime(time) {
    this.startDate = this.changeTimeOfDay(this.startDate, time);
    this.endDate = this.calculateEndDate(this.startDate, this.duration);
  }

  /**
   * Event Hook: User changed duration.
   * Calculates new End Date.
   */
  onChangeDuration(value) {
    this.duration = value;
    this.endDate = this.calculateEndDate(this.startDate, this.duration);
  }

  /**
   * Event Hook: User clicked book now button.
   * Hides Car Information, shows booking dialog and scrolls to the top.
   */
  onBookNow() {
    this.showCar = false;
    window.scroll(0, 0);
  }

  /**
   * Event Hook: User clicked confirm booking.
   * Booking is added by the service and user is re-routed to "My Bookings" page.
   */
  onConfirmBooking() {
    const booking: Booking = { startDate: this.startDate, endDate: this.endDate, carId: this.car.id };
    this.bookingService.addBooking(booking).subscribe(_ => {
      this.router.navigateByUrl('/bookings');
    });
  }

  /**
   * Calculates the end date of a booking for a given start date and duration
   * @param startDate the start date.
   * @param duration  the duration in full days
   * @returns the calculated end date
   */
  calculateEndDate(startDate: Date, duration: number): Date {
    const DAY_IN_MS = 86400000;
    const endDate = new Date(startDate);
    endDate.setTime(startDate.getTime() + duration * DAY_IN_MS);
    return endDate;
  }

  /**
   * Changes the time of day in a date object
   * @param oldDate the date which time should be changed
   * @param time the time as a string in following format: 'hh:mm'
   * @returns a new Date with the changed time
   */
  changeTimeOfDay(oldDate: Date, time: string): Date {
    const date = new Date(oldDate);
    const timeArr = time.split(':');
    if (timeArr.length < 2) {
      throw new Error('changeTimeOfDay has to be called with this time format: "hh:mm"');
    }
    const hours = timeArr[0];
    const minutes = timeArr[1];
    date.setHours(Number.parseInt(hours, 10));
    date.setMinutes(Number.parseInt(minutes, 10));
    return date;
  }

}
