import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor(
    private httpSerivce: HttpService
  ) { }

  getSensorsReadings(): Observable<any> {
    return this.httpSerivce.get("Sensor/key-sensors/by-house-object/1")
  }
}
