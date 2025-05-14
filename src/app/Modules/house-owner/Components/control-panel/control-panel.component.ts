import { Component, Host, HostListener } from '@angular/core';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { firstValueFrom, from } from 'rxjs';
import { allAnimations } from '../../../../Animations/all-animations';
import { ControlService } from '../../../../../Services/control.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

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
/**
 * The `ControlPanelComponent` is responsible for managing the control panel functionality
 * in the application. It allows toggling between automated and manual control modes
 * for various systems such as lights, fans, and watering.
 * 
 * This component uses Angular's reactive forms to manage the state of the controls
 * and dynamically enables or disables manual controls based on the selected mode.
 * 
 * @class
 * @implements {OnInit}
 */
export class ControlPanelComponent {
  /**
   * The reactive form group that holds the state of the control panel.
   * @type {FormGroup}
   */
  form!: FormGroup;

  /**
   * A flag indicating whether manual controls are disabled.
   * @type {boolean}
   */

  isManualDisabled: boolean | null = null;
  isLoading: boolean = true;

  controlOptions: any

  /**
   * Constructor for the `ControlPanelComponent`.
   * Initializes the form builder dependency.
   * 
   * @param {FormBuilder} fb - The Angular `FormBuilder` service for creating reactive forms.
   */
  constructor(
    private toaster: ToastrService,
    private fb: FormBuilder,
    private controlService: ControlService

  ) { }

  /**
   * Lifecycle hook that is called after the component is initialized.
   * Builds the form and checks the initial state of manual controls.
   */
  ngOnInit(): void {
    this.buildForm();
    this.getControlData();
  }

  async getControlData() {
    this.isLoading = true;
    this.controlOptions = await firstValueFrom(this.controlService.getControlData());    
    this.form.patchValue({
      automatedControl: this.controlOptions[this.controlOptions.length - 1].isAutomated,
      toggleLights: this.controlOptions[this.controlOptions.length - 1].lightStatus,
      toggleFans: this.controlOptions[this.controlOptions.length - 1].fanStatus,
      toggleWatering: this.controlOptions[this.controlOptions.length - 1].waterStatus,
    });
    this.checkManualControl();
    this.isLoading = false;
  }

  /**
   * Checks the value of the `automatedControl` field in the form.
   * Disables or enables manual controls based on the value.
   */
  checkManualControl(): void {
    this.form.get('automatedControl')?.value == 1 ? this.disableManualControl() : this.enableManualControl();
  }

  /**
   * Disables all manual control fields in the form.
   * This is triggered when `automatedControl` is enabled.
   */
  disableManualControl(): void {
    this.isManualDisabled = true;
    this.form.get('toggleLights')?.disable();
    this.form.get('toggleFans')?.disable();
    this.form.get('toggleWatering')?.disable();
  }

  /**
   * Enables all manual control fields in the form.
   * This is triggered when `automatedControl` is disabled.
   */
  enableManualControl(): void {
    this.isManualDisabled = false;
    this.form.get('toggleLights')?.enable();
    this.form.get('toggleFans')?.enable();
    this.form.get('toggleWatering')?.enable();
  }

  /**
   * Builds the reactive form for the control panel.
   * Initializes the form fields with default values.
   */
  buildForm(): void {
    this.form = this.fb.group({
      automatedControl: [], // Default to automated control enabled
      toggleLights: [],   // Default to lights off
      toggleFans: [],     // Default to fans off
      toggleWatering: []  // Default to watering off
    });
  }

  async toggleAutomatedControl() {
    this.isLoading = true;
    if (this.form.get('automatedControl')?.value === true) {
      try {
        await firstValueFrom(this.controlService.turnAutomatedOn());
        this.toaster.success("Automated control is enabled");
        this.getControlData();
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