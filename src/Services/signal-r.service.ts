import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;

  private controlUpdateSubject = new BehaviorSubject<any>(null);
  public controlUpdate$ = this.controlUpdateSubject.asObservable();

  private sensorUpdateSubject = new BehaviorSubject<any>(null);
  public sensorUpdate$ = this.sensorUpdateSubject.asObservable();

  constructor() { }

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://greensync2025-001-site1.ntempurl.com/controlStatusHub')
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start();

    this.hubConnection.on('ReceiveControlUpdate', (data) => {
      this.controlUpdateSubject.next(data);
    });
  }

  startSensorsConnection() {
    const sensorsHubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://greensync2025-001-site1.ntempurl.com/controlStatusHub')
      .withAutomaticReconnect()
      .build();

    sensorsHubConnection.start();

    sensorsHubConnection.on('ReceiveSensorsUpdate', (data) => {
      this.sensorUpdateSubject.next(data);
    });
  }
}
