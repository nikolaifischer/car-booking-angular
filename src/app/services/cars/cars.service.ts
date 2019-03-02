import { Injectable } from '@angular/core';
import { CarSimple } from 'src/app/models/carSimple';
import { CarDetail } from 'src/app/models/carDetail';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app.settings';

@Injectable({
  providedIn: 'root'
})
/**
 * This service gets cars from the backend.
 */
export class CarsService {
  constructor(private http: HttpClient) { }

  /**
   * Gets all cars from the backend as a simple representation
   * @returns An Observable of all Cars without details.
   */
  getCars(): Observable<CarSimple []> {
    return this.http.get<CarSimple[]>(AppSettings.API_CAR_ENDPOINT + '.json');
  }

  /**
   * Gets a specific car with all details by its ID
   * @param id the id of the car
   * @returns An Observable of the car with all details.
   */
  getCarById(id: number): Observable<CarDetail> {
    const query = AppSettings.API_CAR_ENDPOINT + `/${id}.json`;
    return this.http.get<CarDetail>(query);
  }
}
