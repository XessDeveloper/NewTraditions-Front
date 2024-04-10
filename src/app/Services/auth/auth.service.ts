import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthUser } from '../../Models/Auth/i-auth-user';
import { IApiResponse } from '../../Models/shared/i-api-response';
import { CookieService } from 'ngx-cookie-service';
import { IAuthRequest } from '../../Models/Auth/requests/i-auth-request';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })

export class AuthService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  Register(request: IAuthRequest): Observable<IApiResponse<IAuthRequest>> {
    return this.http.post<IApiResponse<IAuthRequest>>('/Auth/Register', request);
  }

  Login(request: IAuthUser): Observable<IApiResponse<IAuthUser>> {
     return this.http.post<IApiResponse<IAuthUser>>('/Auth/Login', request);
  }

  GetFromLocal = () => localStorage.getItem('token');
  SetToLocal = (tokenJWT: string) => localStorage.setItem('token', tokenJWT);
  CheckIfUserLogged = () => !!this.GetFromLocal()
  GetClaimsFromToken = () => {
    const token = this.GetFromLocal();

    if (token) return this.jwtHelper.decodeToken(token)
    
    return null
  }
}
