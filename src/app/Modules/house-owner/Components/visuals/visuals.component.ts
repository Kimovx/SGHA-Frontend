import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CameraService } from '../../../../../Services/camera.service';
import { first, firstValueFrom } from 'rxjs';
import { SignalRService } from '../../../../../Services/signal-r.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-visuals',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './visuals.component.html',
  styleUrl: './visuals.component.css'
})
export class VisualsComponent implements OnInit {
  data: any[];

  constructor(
    private cameraService: CameraService,
    private signalRService: SignalRService
  ) {
    this.data = [];
  }

  ngOnInit(): void {
    this.getMedia();
  }

  async getMedia() {
    this.data = await firstValueFrom(this.cameraService.getMedia(1));
    this.getUpdatesFromSignalR();
  }

  getUpdatesFromSignalR() {
    this.signalRService.imagesUpdate$.subscribe(data => {
      if (data) {
        this.data = data;
      }
    });
  }
}
