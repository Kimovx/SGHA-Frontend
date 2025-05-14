import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AIIssuesService {

  constructor(
    private httpService: HttpService
  ) { }

  getAllIssues(): Observable<any> {
    return this.httpService.get("AI_Issues/1");
  }
}
