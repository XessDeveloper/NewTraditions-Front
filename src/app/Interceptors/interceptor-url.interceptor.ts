import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../Environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class interceptorUrlInterceptor implements HttpInterceptor {
  private apiUrl = environment.apiUrl;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modifiedRequest = request.clone({
      url: `${this.apiUrl}${request.url}`,
      withCredentials: true,
    });
    return next.handle(modifiedRequest);
  }
}
