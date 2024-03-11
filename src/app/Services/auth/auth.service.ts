import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthUser } from '../../Models/Auth/i-auth-user';
import { IStatusCodeResponse } from '../../Models/shared/i-status-code-response';
import { CookieService } from 'ngx-cookie-service';
import { IAuthRequest } from '../../Models/Auth/requests/i-auth-request';

@Injectable({ providedIn: 'root' })

export class AuthService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }

  Register(request: IAuthRequest): Observable<IStatusCodeResponse<IAuthRequest>> {
    return this.http.post<IStatusCodeResponse<IAuthRequest>>('/Auth/Register', request);
  }

  Login(request: IAuthUser): Observable<IStatusCodeResponse<IAuthUser>> {
     return this.http.post<IStatusCodeResponse<IAuthUser>>('/Auth/Login', request);
  }

  async GetCookie() {
    let cookie: string = '';

    while (cookie === '') {
      cookie = this.cookieService.get(".AspNetCore.Identity.Application")

      if (cookie === '') {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
    }
  }

  SetCookie(cookieName: string, cookieValue: string) {
    this.cookieService.set(cookieName, cookieValue);
  }
}
