import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from './Animations/route-animations';
import { ToastrModule } from 'ngx-toastr';
import { SignalRService } from '../Services/signal-r.service';
import { NotificationsService } from '../Services/notifications.service';

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
    private notificationService: NotificationsService
  ) { }

  ngOnInit(): void {
    this.signalRService.startConnection();
    this.notificationService.askNotificationPermission();
  }

  // This method is used to prepare the route for animations
  prepareRoute(outlet: RouterOutlet | null) {
    if (!outlet || !outlet.isActivated) {
      return 'none';
    }
    return outlet.activatedRoute.url;
  }

}
