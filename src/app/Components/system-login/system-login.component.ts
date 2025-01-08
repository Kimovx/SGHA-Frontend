import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../Model/LoginRequesr';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-system-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './system-login.component.html',
  styleUrl: './system-login.component.css'
})
export class SystemLoginComponent implements OnInit {
  loginRequest: LoginRequest;
  
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService
  ){
    this.loginRequest = {} as LoginRequest;
  }

  ngOnInit(): void {}

  loginFormGroup = this._formBuilder.group({
    emailAddress: ['', Validators.required],
    accountPassword: ['', Validators.required]
  });

  async onSubmit(event: Event){
    event.preventDefault();

    this.loginRequest.emailAddress = this.loginFormGroup.get('emailAddress')?.value!;
    this.loginRequest.accountPassword = this.loginFormGroup.get('accountPassword')?.value!;

    console.log(await firstValueFrom(this.authService.loginRequest(this.loginRequest)))
  }

}
