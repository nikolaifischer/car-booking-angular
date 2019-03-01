import { Injectable } from '@angular/core';
import { CarSimple } from 'src/app/models/carSimple';
import { CarDetail } from 'src/app/models/carDetail';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  private corsProxy = 'https://cors-anywhere.herokuapp.com/';
  private apiUrl = 'http://job-applicants-dummy-api.kupferwerk.net.s3.amazonaws.com/api/cars';
  constructor(private http: HttpClient) { }

  // ToDo: Error Handling
  getCars(): Observable<CarSimple []> {
    return this.http.get<CarSimple[]>(this.corsProxy + this.apiUrl + '.json');
  }

  // TodDo: Error Handling
  getCarById(id: number) {
    const query = this.corsProxy + this.apiUrl + `/${id}.json`;
    return this.http.get<CarDetail>(query);

  }
}
