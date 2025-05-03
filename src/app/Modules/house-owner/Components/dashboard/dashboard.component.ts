import { Component } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { trigger, transition, animate, keyframes, style } from '@angular/animations';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SideNavComponent,
    MatSlideToggleModule
  ],
  animations: [
    trigger('numberChange', [
      transition(':increment', [
        animate('0.5s ease-in-out', keyframes([
          style({ opacity: 0, transform: 'translateY(-20%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
        ]))
      ]),
      transition(':decrement', [
        animate('0.5s ease-in-out', keyframes([
          style({ opacity: 0, transform: 'translateY(20%)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 })
        ]))
      ])
    ])
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
