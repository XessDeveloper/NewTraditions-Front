import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Views/register/register.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './Views/login/login.component';
import { HomeComponent } from './Views/home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'registro', component: RegisterComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
