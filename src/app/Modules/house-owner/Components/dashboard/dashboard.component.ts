import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { allAnimations } from '../../../../Animations/all-animations';
import { SensorsService } from '../../../../../Services/sensors.service';
import { firstValueFrom } from 'rxjs';
import { SignalRService } from '../../../../../Services/signal-r.service';
import { CameraService } from '../../../../../Services/camera.service';
import { SensoresReadings } from '../../../../Model View/SensorsReadings';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SideNavComponent,
    MatSlideToggleModule
  ],
  animations: [
    allAnimations
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  data: SensoresReadings;
  
  isLoading: boolean = true;

  selectedImage!: File;

  constructor (
    private sensorsService: SensorsService,
    private signalRService: SignalRService,
    private cameraService: CameraService
  ){
    this.data = {} as SensoresReadings;
  }

  ngOnInit(): void {
    this.getAllSersors();
  }
  
  getSensorsData() {
    this.signalRService.sensorUpdate$.subscribe((data) => {
      if(data){
        console.log('Sensor Data:', data);  
        this.data = data;
      }
    });
  }

  async getAllSersors(){
    this.isLoading = true;
    this.data = await firstValueFrom(this.sensorsService.getSensorsReadings());
    
    this.isLoading = false;
    this.getSensorsData();
  }

  onFileSelected(event: any){
    const file = event.target.files[0];
    if(file) {
      this.selectedImage = file;
    }
  }

  async upload(){
    if(!this.selectedImage) {
      alert("No file selected to upload!");
      return;
    }
    
    try {
      const res = await firstValueFrom(this.cameraService.uploadImage(1, this.selectedImage));
    }
    catch (e: any) {
      console.log(e.message);
    }

  }
}
