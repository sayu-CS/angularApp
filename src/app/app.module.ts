import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './_Common/module/material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignUpComponent } from 'src/app/sign-up/sign-up.component';
import { loggingService } from './_Common/services/logging.services';

import {ReactiveFormsModule} from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { AppRoutingModule } from './_Common/module/app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LogoutNavComponent } from './logout-nav/logout-nav.component';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginPageComponent,
    MainpageComponent,
    NavbarComponent,
    WelcomePageComponent,
    LogoutNavComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
