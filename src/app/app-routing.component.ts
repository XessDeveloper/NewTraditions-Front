import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Views/register/register.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './Views/login/login.component';
import { HomeComponent } from './Views/home/home.component';
import { IngredientsComponent } from './Views/ingredients/ingredients.component';
import { PlatesComponent } from './Views/plates/plates.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'home', component: HomeComponent, pathMatch: 'full' },
    { path: 'registro', component: RegisterComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent, pathMatch: 'full' },
    { path: 'ingredientes', component: IngredientsComponent, pathMatch: 'full' },
    { path: 'platos', component: PlatesComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
