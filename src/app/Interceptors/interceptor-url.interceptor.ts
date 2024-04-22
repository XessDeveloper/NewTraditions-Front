import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment';
import { Observable, catchError } from 'rxjs';
import { AuthService } from '../Services/auth/auth.service';

@Injectable()
export class interceptorUrlInterceptor implements HttpInterceptor {
  private apiUrl = environment.apiUrl;
  private apiUrl2 = environment.apiUrl2;

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.GetToken();
  
      const modifiedRequestUrl1 = request.clone({
        url: `${this.apiUrl}${request.url}`,
        setHeaders: token !== null ? { Authorization: `Bearer ${token}` } : {}
      });

      return next.handle(modifiedRequestUrl1);
  }
}