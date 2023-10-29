import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from '../common/footer/footer.component';


@NgModule({
  declarations: [
    LoginComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    BrowserModule,
    FormsModule
  ]
})
export class AuthModule { }
