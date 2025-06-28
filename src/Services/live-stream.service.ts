import { AfterViewInit, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LiveStreamService implements AfterViewInit {

  constructor() { }
  
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
}
