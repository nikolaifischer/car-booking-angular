import { Injectable } from '@angular/core';
import { CarSimple } from 'src/app/models/carSimple';
import { CarDetail } from 'src/app/models/carDetail';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app.settings';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  constructor(private http: HttpClient) { }

  getCars(): Observable<CarSimple []> {
    return this.http.get<CarSimple[]>(AppSettings.API_CAR_ENDPOINT + '.json');
  }

  getCarById(id: number) {
    const query = AppSettings.API_CAR_ENDPOINT + `/${id}.json`;
    return this.http.get<CarDetail>(query);

  }
}
