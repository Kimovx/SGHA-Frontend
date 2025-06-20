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
  }

  prepareRoute(outlet: RouterOutlet | null) {
    if (!outlet || !outlet.isActivated) {
      return 'none';
    }
    return outlet.activatedRoute.url;
  }

}
