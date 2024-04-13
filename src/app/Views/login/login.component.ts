import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../Services/auth/auth.service';
import { IAuthUser } from '../../Models/Auth/i-auth-user';
import { IApiCodes } from '../../Models/shared/i-api-codes';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HelpMethods } from '../../HelpMethods/help-methods';

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService) { }
  @ViewChild('loginForm') loginForm!: NgForm;
  subscriptions: Subscription = new Subscription()
  helpMethods: HelpMethods = new HelpMethods()

  user: IAuthUser = {
    id: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    rol: '',
  }

  login() {
    this.subscriptions.add(this.authService.Login(this.user).subscribe(
      response => {
      if (response.statusCode === IApiCodes.Ok) {
        Swal.fire({ text: `${response.message}`, icon: 'success' })
        this.authService.setToken(response.token!)
      }
    },
    errorResponse => {
      switch(errorResponse.status) {
        case IApiCodes.Unauthorized: Swal.fire({ text: `${errorResponse.error.message}`, icon: 'error'}); this.helpMethods.resetFields(this.loginForm); break;
        case IApiCodes.NotFound: Swal.fire({ text: `${errorResponse.error.message}`, icon: 'error'}); this.helpMethods.resetFields(this.loginForm); break;
        case IApiCodes.InternalServerError: console.debug(errorResponse.error.message); this.helpMethods.resetFields(this.loginForm); break;
      }
    }))
  }

  OnDestroy = () => this.subscriptions.unsubscribe();
}
