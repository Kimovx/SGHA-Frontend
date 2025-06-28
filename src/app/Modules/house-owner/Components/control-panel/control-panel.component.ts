import { Component, Host, HostListener } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { firstValueFrom, from } from 'rxjs';
import { allAnimations } from '../../../../Animations/all-animations';
import { ControlService } from '../../../../../Services/control.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { SignalRService } from '../../../../../Services/signal-r.service';
import { Title } from '@angular/platform-browser';
import { NotificationsService } from '../../../../../Services/notifications.service';

@Component({
  selector: 'app-control-panel',
  standalone: true,
  imports: [
    SideNavComponent,
    ReactiveFormsModule,
    CommonModule
  ],
  animations: [allAnimations],
  templateUrl: './control-panel.component.html',
  styleUrl: './control-panel.component.css'
})
export class ControlPanelComponent {
  form!: FormGroup;
  isManualDisabled: boolean | null = null;
  isLoading: boolean = true;
  controlOptions: any

  constructor(
    private toaster: ToastrService,
    private fb: FormBuilder,
    private controlService: ControlService,
    private signalRService: SignalRService,
    private notificationsService: NotificationsService,
  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.getControlData();
  }

  async getControlData(): Promise<void> {
    this.isLoading = true;

    const data = await firstValueFrom(this.controlService.getControlData());
    this.controlOptions = data;
    console.log('Control Options:', this.controlOptions);

    this.form.patchValue({
      automatedControl: this.controlOptions[0].isAutomated,
      toggleLights: this.controlOptions[0].lightStatus,
      toggleFans: this.controlOptions[0].fanStatus,
      toggleWatering: this.controlOptions[0].waterStatus,
    });

    this.checkManualControl();
    this.isLoading = false;
    this.updateControlDataFromSignalR();
  }

  updateControlDataFromSignalR(): void {
    this.isLoading = true;
    this.signalRService.controlUpdate$.subscribe((data) => {
      if (data) {
        if(data !== this.controlOptions){
          console.log('Control Update Received:', data);
          this.controlOptions = data;
          this.notificationsService.setNotification("Control Updaded!");
  
          this.form.patchValue({
            automatedControl: data.isAutomated,
            toggleLights: data.lightStatus,
            toggleFans: data.fanStatus,
            toggleWatering: data.waterStatus,
          });
          this.checkManualControl();
        }
      }
      this.isLoading = false;
    });
  }

  checkManualControl(): void {
    this.form.get('automatedControl')?.value == 1 ? this.disableManualControl() : this.enableManualControl();
  }

  disableManualControl(): void {
    this.isManualDisabled = true;
    this.form.get('toggleLights')?.disable();
    this.form.get('toggleFans')?.disable();
    this.form.get('toggleWatering')?.disable();
  }

  enableManualControl(): void {
    this.isManualDisabled = false;
    this.form.get('toggleLights')?.enable();
    this.form.get('toggleFans')?.enable();
    this.form.get('toggleWatering')?.enable();
  }

  buildForm(): void {
    this.form = this.fb.group({
      automatedControl: [],
      toggleLights: [],
      toggleFans: [],
      toggleWatering: []
    });
  }

  async toggleAutomatedControl() {
    this.isLoading = true;
    if (this.form.get('automatedControl')?.value === true) {
      try {
        await firstValueFrom(this.controlService.turnAutomatedOn());
        this.toaster.success("Automated control is enabled");
        this.isLoading = false;
      } catch (e: any) {
        this.toaster.error("Something Worng!");
        this.form.get('automatedControl')?.patchValue(!this.form.get('automatedControl')?.value);
        this.isLoading = false;
      }
    } else {
      try {
        await firstValueFrom(this.controlService.turnAutomatedOff());
        this.toaster.success("Automated control is disabled");
        this.isLoading = false;
      } catch (e: any) {
        this.toaster.error("Something Worng!");
        this.form.get('automatedControl')?.patchValue(!this.form.get('automatedControl')?.value);
        this.isLoading = false;
      }
    }
  }

  async toggleWatering() {
    this.isLoading = true;
    if (this.form.get('toggleWatering')?.value === true) {
      try {
        await firstValueFrom(this.controlService.turnWaterOn());
        this.toaster.success("Watering is enabled");
        this.isLoading = false;
      } catch (e: any) {
        this.toaster.error("Something Worng!");
        this.form.get('toggleWatering')?.patchValue(!this.form.get('toggleWatering')?.value);
        this.isLoading = false;
      }
    } else {
      try {
        await firstValueFrom(this.controlService.turnWaterOff());
        this.toaster.success("Watering is disabled");
        this.isLoading = false;
      } catch (e: any) {
        this.toaster.error("Something Worng!");
        this.form.get('toggleWatering')?.patchValue(!this.form.get('toggleWatering')?.value);
        this.isLoading = false;
      }
    }
  }

  async toggleLights() {
    this.isLoading = true;
    if (this.form.get('toggleLights')?.value === true) {
      try {
        await firstValueFrom(this.controlService.turnLightOn());
        this.toaster.success("Lights is enabled");
        this.isLoading = false;
      } catch (e: any) {
        this.toaster.error("Something Worng!");
        this.form.get('toggleLights')?.patchValue(!this.form.get('toggleLights')?.value);
        this.isLoading = false;
      }
    } else {
      try {
        await firstValueFrom(this.controlService.turnLightOff());
        this.toaster.success("Lights is disabled");
        this.isLoading = false;
      } catch (e: any) {
        this.toaster.error("Something Worng!");
        this.form.get('toggleLights')?.patchValue(!this.form.get('toggleLights')?.value);
        this.isLoading = false;
      }
    }
  }

  async toggleFans() {
    this.isLoading = true;
    if (this.form.get('toggleFans')?.value === true) {
      try {
        await firstValueFrom(this.controlService.turnFansOn());
        this.toaster.success("Fans is enabled");
        this.isLoading = false;
      } catch (e: any) {
        this.toaster.error("Something Worng!");
        this.form.get('toggleFans')?.patchValue(!this.form.get('toggleFans')?.value);
        this.isLoading = false;
      }
    } else {
      try {
        await firstValueFrom(this.controlService.turnFansOff());
        this.toaster.success("Fans is disabled");
        this.isLoading = false;
      } catch (e: any) {
        this.toaster.error("Something Worng!");
        this.form.get('toggleFans')?.patchValue(!this.form.get('toggleFans')?.value);
        this.isLoading = false;
      }
    }
  }
}
