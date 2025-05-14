import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { allAnimations } from '../../../../Animations/all-animations';
import { SensorsService } from '../../../../../Services/sensors.service';
import { firstValueFrom } from 'rxjs';


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

  tempValue: number = 0;
  humValue: number = 0;
  monValue: number = 0;

  isLoading: boolean = true;

  constructor (
    private sensorsService: SensorsService
  ){}

  ngOnInit(): void {
    setInterval(()=>{
      this.getAllSersors();
    }, 2000)
  }

  async getAllSersors(){
    this.isLoading = true;
    const data = await firstValueFrom(this.sensorsService.getSensorsReadings());
    this.tempValue = data.temperature;
    this.humValue = data.humidity;
    this.monValue = data.moisture;
    this.isLoading = false;
  }

}
