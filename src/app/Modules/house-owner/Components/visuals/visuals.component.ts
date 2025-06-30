import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CameraService } from '../../../../../Services/camera.service';
import { first, firstValueFrom } from 'rxjs';
import { SignalRService } from '../../../../../Services/signal-r.service';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { AiImagesResponse } from '../../../../Model View/AiImages';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-visuals',
  standalone: true,
  imports: [
    CommonModule,
    SideNavComponent,
    MatRippleModule,
    RouterModule
  ],
  templateUrl: './visuals.component.html',
  styleUrl: './visuals.component.css'
})
export class VisualsComponent implements OnInit {
  data: AiImagesResponse;

  isLoading: boolean;

  constructor(
    private cameraService: CameraService,
    private signalRService: SignalRService
  ) {
    this.data = [];
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.getMedia();
  }

  async getMedia() {
    this.isLoading = true;
    this.data = await firstValueFrom(this.cameraService.getDetectedImages(1));
    this.getUpdatesFromSignalR();
    this.isLoading = false;
  }

  getUpdatesFromSignalR() {
    this.signalRService.latestImage$.subscribe(data => {
      if (data) {
        this.data.push(data);
      }
    });
  }
}
