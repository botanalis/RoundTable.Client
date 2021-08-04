import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./views/home/home.component";
import { AuthGuard } from "./_helpers";
import { LoginComponent } from "./views/login/login.component";
import {LayoutComponent} from "./views/layout/layout.component";
import {RegisterComponent} from "./views/register/register.component";

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);

const routes: Routes = [
  {
    path: '', component: LayoutComponent, canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'account', loadChildren: accountModule},
      { path: '',   redirectTo: '/home', pathMatch: 'full' },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
