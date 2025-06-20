import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from './Animations/route-animations';
import { ToastrModule } from 'ngx-toastr';
import { SignalRService } from '../Services/signal-r.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [routeTransitionAnimations],
})
export class AppComponent implements OnInit {
  title = 'SGHA';

  constructor(
    private signalRService: SignalRService,
    private router: Router,
    protected route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.signalRService.startConnection();
    this.askNotificationPermission();
  }

  askNotificationPermission() {
  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('🔔 Notification permission granted!');
        } else if (permission === 'denied') {
          console.log('❌ Notification permission denied.');
        }
      });
    } else if (Notification.permission === 'granted') {
      console.log('✅ Notification permission already granted.');
    } else {
      console.log('❌ Notification already denied.');
    }
  } else {
    console.warn('⚠️ Browser does not support notifications.');
  }
}


  // This method is used to prepare the route for animations
  prepareRoute(outlet: RouterOutlet | null) {
    if (!outlet || !outlet.isActivated) {
      return 'none';
    }
    return outlet.activatedRoute.url;
  }

}
