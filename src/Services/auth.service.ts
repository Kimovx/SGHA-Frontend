import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LoginRequest } from '../app/Model/LoginRequesr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService
  ) { }

  loginRequest(loginData: LoginRequest): Observable<any>{
    return this.httpService.post<any>(`Auth/login`, loginData);
  }
  

}
