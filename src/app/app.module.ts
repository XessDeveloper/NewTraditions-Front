import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.component';
import { interceptorUrlInterceptor } from './Interceptors/interceptor-url.interceptor';

import { AppComponent } from './app.component';
import { FooterComponent } from './Components/footer/footer.component';
import { RegisterComponent } from './Views/register/register.component';
import { LoginComponent } from './Views/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: interceptorUrlInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
