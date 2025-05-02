import { HttpService } from './../../../Services/http.service';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../Model/LoginRequesr';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../Services/auth.service';
import {MatRippleModule} from '@angular/material/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HousesService } from '../../../Services/houses.service';

@Component({
  selector: 'app-system-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatRippleModule,
    CommonModule,
    RouterModule
  ],
  animations: [
    trigger('heightAnimation', [
      transition(':enter', [
        style({ height: '0px', opacity: 0 }),
        animate('250ms ease-out', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-out', style({ height: '0px', opacity: 0 }))
      ])
    ]),
    trigger('heightWidthAnimation', [
      transition(':enter', [
        style({ height: '0px', width: '0px', opacity: 0 }),
        animate('250ms ease-out', style({ height: '*', width: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-out', style({ height: '0px', width: '0px', opacity: 0 }))
      ])
    ]),
    trigger('fadeInAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ],
  templateUrl: './system-login.component.html',
  styleUrl: './system-login.component.css'
})
export class SystemLoginComponent implements OnInit {
  loginRequest: LoginRequest;

  // Boolean Variables
  isInvalid: boolean
  isLoading: boolean

  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private housesSerivce: HousesService,
  ){
    this.loginRequest = {} as LoginRequest;

    // Boolean Variables
    this.isInvalid = false;
    this.isLoading = false;
  }

  ngOnInit(): void {}

  @HostListener('input', ['$event'])
  onInput(){
    this.isInvalid = false;
  }

  loginFormGroup = this._formBuilder.group({
    emailAddress: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
    accountPassword: ['', [Validators.required, Validators.minLength(8)]]
  });

  async onSubmit(event: Event){
    console.log(firstValueFrom(this.housesSerivce.getALlHouses()));
    event.preventDefault();
    this.isLoading = true;

    this.loginRequest.emailAddress = this.loginFormGroup.get('emailAddress')?.value!;
    this.loginRequest.accountPassword = this.loginFormGroup.get('accountPassword')?.value!;

    try {
      const res = await firstValueFrom(this.authService.loginRequest(this.loginRequest));
      console.log(res)
      this.isLoading = false;
    }
    catch {
      this.isInvalid = true;
      this.isLoading = false;
    }
  }

}
