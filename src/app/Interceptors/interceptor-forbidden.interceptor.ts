import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from '../Services/auth/auth.service';

@Injectable()
export class interceptorForbiddenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403 && !this.authService.CheckIfUserLogged()) {
          Swal.fire({
            icon: 'error',
            title: "No tienes los permisos suficientes",
            confirmButtonText: "Entiendo"
          }).then( (result) => {
            if (result.isConfirmed)
              this.router.navigate(['/login']);
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: "No tienes los permisos suficientes",
            confirmButtonText: "Entiendo"
          })
        }
        return throwError(error)
      }));
  }

}