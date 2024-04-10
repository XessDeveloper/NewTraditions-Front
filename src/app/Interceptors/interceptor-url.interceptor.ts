import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../Services/auth/auth.service';

@Injectable()
export class interceptorUrlInterceptor implements HttpInterceptor {
  private apiUrl = environment.apiUrl;

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.GetFromLocal();

      const modifiedRequest = request.clone({
        url: `${this.apiUrl}${request.url}`,
        setHeaders: { Authorization: `Bearer ${token}`}
      });
      return next.handle(modifiedRequest);
    }
}