import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { SensoresReadings as SensorsReadings } from '../Model View/SensorsReadings';

@Injectable({
  providedIn: 'root'
})
export class SensorsService {

  constructor(
    private httpSerivce: HttpService
  ) { }

  getSensorsReadings(): Observable<SensorsReadings> {
    return this.httpSerivce.get<SensorsReadings>("Sensor/key-sensors/by-house-object/1")
  }
}
