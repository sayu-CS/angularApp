import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LoginPageComponent } from "src/app/login-page/login-page.component";
import { MainpageComponent } from "src/app/mainpage/mainpage.component";
import { SignUpComponent } from "src/app/sign-up/sign-up.component";
import { WelcomePageComponent } from "src/app/welcome-page/welcome-page.component";



const appRoutes: Routes = [
{ path: 'login', component: LoginPageComponent},
{ path: 'signup', component: SignUpComponent},
{ path: 'dashboard' ,component: MainpageComponent},
{ path: '', component: WelcomePageComponent} 

];


@NgModule({
imports: [
    RouterModule.forRoot(appRoutes)
],
exports: [
    RouterModule,
]
})

export class AppRoutingModule {}

//does the routing easy to manipulate if in different file