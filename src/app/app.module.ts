import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { FooterComponent } from './Components/footer/footer.component';
import { RegisterComponent } from './Views/register/register.component';
import { LoginComponent } from './Views/login/login.component';
import { interceptorUrlInterceptor } from './Interceptors/interceptor-url.interceptor';
import { interceptorForbiddenInterceptor } from './Interceptors/interceptor-forbidden.interceptor';
import { IngredientsComponent } from './Views/ingredients/ingredients.component';
import { HeaderComponent } from './Components/header/header.component';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import { EditButtonRendererComponent } from './Formatters-Renderers/Renderers/edit-button-renderer/edit-button-renderer.component';
import { DeleteButtonRendererComponent } from './Formatters-Renderers/Renderers/delete-button-renderer/delete-button-renderer.component';
import { HelpMethods } from './HelpMethods/help-methods';
import { CreateIngredientComponent } from './Views/ingredients/create-ingredient/create-ingredient.component';
import { UpdateIngredientComponent } from './Views/ingredients/update-ingredient/update-ingredient.component';


@NgModule({
  declarations: [
    EditButtonRendererComponent,
    DeleteButtonRendererComponent,
    HeaderComponent,
    SidenavComponent,
    AppComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    IngredientsComponent,
    CreateIngredientComponent,
    UpdateIngredientComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('token')
      }
    }),
    AgGridModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: interceptorUrlInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: interceptorForbiddenInterceptor, multi: true },
    HelpMethods
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
