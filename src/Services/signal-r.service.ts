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

  private issuesUpdateSubject = new BehaviorSubject<any>(null);
  public issuesUpdate$ = this.issuesUpdateSubject.asObservable();
  
  private imagesUpdateSubject = new BehaviorSubject<any>(null);
  public imagesUpdate$ = this.imagesUpdateSubject.asObservable();

  constructor() { }

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('http://greeensync-001-site1.jtempurl.com/controlStatusHub')
      .withAutomaticReconnect()
      .build();

    // 🟢 لازم تسجل الأحداث قبل start()
    this.hubConnection.on('ReceiveControlUpdate', (data) => {
      this.controlUpdateSubject.next(data);
    });

    this.hubConnection.on('ReceiveSensorsUpdate', (data) => {
      this.sensorUpdateSubject.next(data);
    });

    this.hubConnection.on('ReceiveIssues', (data) => {
      console.log("📥 Received from SignalR:", data);
      this.issuesUpdateSubject.next(data);
    });

    this.hubConnection.on('ReceiveImages', (data) => {
      console.log("📥 Received from SignalR:", data);
      this.imagesUpdateSubject.next(data);
    });

    this.hubConnection
      .start()
      .then(() => console.log('✅ SignalR connection started'))
      .catch(err => console.error('❌ SignalR connection error:', err));
  }
}
