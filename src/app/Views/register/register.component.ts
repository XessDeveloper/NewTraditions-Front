import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../Services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { IApiCodes } from '../../Models/shared/i-api-codes';
import { HelpMethods } from '../../HelpMethods/help-methods';
import { IAuthRequest } from '../../Models/Auth/requests/i-auth-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  @ViewChild('registerForm') registerForm!: NgForm;
  subscriptions: Subscription = new Subscription()
  helpMethods: HelpMethods = new HelpMethods()

  surname1: string = ''
  surname2: string = ''

  authRequest: IAuthRequest = {
    authUser: {
      id: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      rol: ''
    },
    usuario: {
      name: '',
      surnames: '',
      email: '',
      phone: '',
      birthDate: ''
    }
  }

  // TODO => Format & Validations // Try to Migrate again to convet date to string in DB
  register() { 
    //this.user.userRequest.birthDate = this.user.userRequest.birthDate.toString().split('-').join('/')
    this.authRequest.usuario.surnames = this.surname1 + " " + this.surname2
    this.authRequest.authUser.email = this.authRequest.usuario.email
    console.log(this.authRequest)

    this.subscriptions.add(this.authService.Register(this.authRequest).subscribe(
      response => {
        console.log(response)

        if (response.statusCode = IApiCodes.Created) {
          Swal.fire({ text: `${response.message}`, icon: 'success' })
          this.router.navigate(['/login'])
        }
      },
      errorResponse => {
        console.log(errorResponse)
        switch(errorResponse.status) {
          case IApiCodes.Unauthorized: Swal.fire({ text: `${errorResponse.error.message}`, icon: 'error'}); this.helpMethods.resetFields(this.registerForm); break;
          case IApiCodes.BadRequest: Swal.fire({ text: `${errorResponse.error.message}`, icon: 'error'}); this.helpMethods.resetFields(this.registerForm); break;
          case IApiCodes.InternalServerError: console.log(errorResponse.error.message); this.helpMethods.resetFields(this.registerForm); break;
        }
      }
    ));
  }

  cancel() {}

  OnDestroy = () => this.subscriptions.unsubscribe();
}
