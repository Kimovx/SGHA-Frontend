import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HousesService {

  constructor(
    private httpService: HttpService
  ) { }

  getALlHouses(): Observable<any> {
    return this.httpService.get<any>(`House/AllHouse`);
  }
}
