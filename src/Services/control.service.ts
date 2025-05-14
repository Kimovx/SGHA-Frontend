import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlService {

  constructor(
    private httpService: HttpService
  ) { }

  getControlData(): Observable<any> {
    return this.httpService.get('ControlOption/by-house/1');
  }

  turnWaterOn(): Observable<void> {
    return this.httpService.patch('ControlOption/water/on/1', {});
  }
  
  turnWaterOff(): Observable<void> {
    return this.httpService.patch('ControlOption/water/off/1', {});
  }

  turnLightOn(): Observable<void> {
    return this.httpService.patch('ControlOption/light/on/1', {});
  }

  turnLightOff(): Observable<void> {
    return this.httpService.patch('ControlOption/light/off/1', {});
  }

  turnAutomatedOn(): Observable<void> {
    return this.httpService.patch('ControlOption/automated/on/1', {});
  }
  
  turnAutomatedOff(): Observable<void> {
    return this.httpService.patch('ControlOption/automated/off/1', {});
  }

  turnFansOn(): Observable<void> {
    return this.httpService.patch('ControlOption/fan/on/1', {});
  }
  
  turnFansOff(): Observable<void> {
    return this.httpService.patch('ControlOption/fan/off/1', {});
  }
}

