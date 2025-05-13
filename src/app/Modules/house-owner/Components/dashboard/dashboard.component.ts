import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { allAnimations } from '../../../../Animations/all-animations';


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

  ngOnInit(): void {
    setInterval(() => {
      this.changeTempValue();
    }, 1000); // Executes every 2 seconds
  }

  changeTempValue(): void {
    this.tempValue = Math.floor(Math.random() * 100); // Generates a random number between 0 and 99
  }
}
