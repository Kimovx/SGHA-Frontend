import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { LoginRequest } from '../app/Model/LoginRequesr';
import { Observable } from 'rxjs';
import { LoginResponse } from '../app/Model View/LoginRespone,';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService
  ) { }

  loginRequest(loginData: LoginRequest): Observable<LoginResponse> {
    return this.httpService.post<LoginResponse>(`Auth/login`, loginData);
  }


}
