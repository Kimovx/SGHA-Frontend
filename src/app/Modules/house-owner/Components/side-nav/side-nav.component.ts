import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { allAnimations } from '../../../../Animations/all-animations';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [
    RouterModule
  ],
  animations: [allAnimations],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  isMenuOpen = false;

  constructor() { }
  toggleMenu(nav: HTMLElement): void {
    this.isMenuOpen = !this.isMenuOpen;
    if (nav) {
      nav.classList.toggle('active-nav');
    }
  }
}
