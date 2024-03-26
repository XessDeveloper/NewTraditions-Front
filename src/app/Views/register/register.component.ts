import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
import { AuthService } from '../../Services/auth/auth.service';
import { Subscription, max } from 'rxjs';
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
  @ViewChild('registerForm') registerForm!: NgForm;

  subscriptions: Subscription = new Subscription()
  helpMethods: HelpMethods = new HelpMethods()
  inputTouched: { [key: string]: boolean } = {}
  maxDate: string;
  emptyInputError = 'El campo no puede estar vacio'
  
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

  constructor(private authService: AuthService, private router: Router) {
    const currentDate = new Date();
    const maxDate = new Date(currentDate.getFullYear() - 5, currentDate.getMonth(), currentDate.getDate()).toISOString().split('T')[0];
    const defaultDate = new Date(currentDate.getFullYear() - 20, currentDate.getMonth(), currentDate.getDate()).toISOString().split('T')[0]

    this.maxDate = maxDate;
    this.authRequest.usuario.birthDate = defaultDate
  }

  register() { 
    this.authRequest.usuario.surnames = this.surname1 + " " + this.surname2
    this.authRequest.authUser.email = this.authRequest.usuario.email

    console.log(this.authRequest)

    this.subscriptions.add(this.authService.Register(this.authRequest).subscribe(
      response => {
        console.log(response)

        if (response.statusCode === IApiCodes.Created) {
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

  cancel() {
    Swal.fire({
      title: "¿Estas seguro que quieres salir?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Salir",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) window.history.back();
    })
  }


  usernameValidation = () => new RegExp('^[a-zA-Z0-9]+$').test(this.authRequest.authUser.username)
  passwordMatches = () => this.authRequest.authUser.password === this.authRequest.authUser.confirmPassword;
  changeInputChangedStatus = (nameField: string) => this.inputTouched[nameField] = true;
  isInputTouched = (nameField: string) => !!this.inputTouched[nameField]
  onDestroy = () => this.subscriptions.unsubscribe();
  ngAfterViewInit = () => console.log(this.registerForm.controls);
}
