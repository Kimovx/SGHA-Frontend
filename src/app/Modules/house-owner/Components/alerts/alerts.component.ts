import { Component, OnInit } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { AIIssuesService } from '../../../../../Services/aiissues.service';
import { firstValueFrom } from 'rxjs';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';
import { SignalRService } from '../../../../../Services/signal-r.service';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [
    SideNavComponent
  ],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent implements OnInit {
  issues: any[] = [];
  isLoading: boolean = true;

  constructor(
    private aiIssuesService: AIIssuesService,
    private signalRService: SignalRService
  ) { }

  ngOnInit(): void {
    this.getAllIssues();
  }

  async getAllIssues() {
    this.isLoading = true;
    this.issues = await firstValueFrom(this.aiIssuesService.getAllIssues());
    this.isLoading = false;
  }


  updateAIIssuesFromSignalR(): void {
    this.signalRService.issuesUpdate$.subscribe((data) => {
      if (data) {
        this.issues = data;
        console.log('AI Issue Update Received:', data);
      }
    });
  }



}
