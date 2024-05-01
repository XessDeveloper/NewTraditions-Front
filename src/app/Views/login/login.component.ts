import { Component, Output, ViewChild, inject } from '@angular/core';
import { AuthService } from '../../Services/auth/auth.service';
import { IAuthUser } from '../../Models/Auth/i-auth-user';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HelpMethods } from '../../HelpMethods/help-methods';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly helpMethods = inject(HelpMethods);
  private readonly router = inject(Router);

  @ViewChild('loginForm') loginForm!: NgForm;
  subscriptions: Subscription = new Subscription()
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
        this.helpMethods.showSwalResponses({
          isSuccessfull: true,
          message: response.message!,
          statusCode: response.statusCode,
          okAction: () => {
            this.authService.setToken(response.token!)
            // Redirect to Home
            this.router.navigate(['/home'])
          }
        })
      },
errorResponse => {
        this.helpMethods.showSwalResponses({
          isSuccessfull: false,
          message: errorResponse.error.message,
          statusCode: errorResponse.statusCode,
          okAction: () => this.helpMethods.resetFields(this.loginForm)
        })
      }
    ))
  }

  OnDestroy = () => this.subscriptions.unsubscribe();
}
