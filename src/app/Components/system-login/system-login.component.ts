import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../Model/LoginRequesr';

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
  constructor(
    private _formBuilder: FormBuilder
  ){}

  ngOnInit(): void {}

  loginFormGroup = this._formBuilder.group({
    emailAddress: ['', Validators.required],
    accountPassword: ['', Validators.required]
  });

  onSubmit(event: Event){
    event.preventDefault();
    console.log(this.loginFormGroup.value)
  }

}
