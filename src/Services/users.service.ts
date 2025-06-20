import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private httpService: HttpService
  ) { }

  getUsersByHouseId(houseId: number): Observable<any> {
    return this.httpService.get<any>(`User/by-house/${houseId}`);
  }
}
