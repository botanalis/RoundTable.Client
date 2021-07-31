import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '../views/layout/layout.component';
import {AccountRoutingModule} from "./account-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import { RegisterComponent } from '../views/register/register.component';

@NgModule({
  declarations: [
    LayoutComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
