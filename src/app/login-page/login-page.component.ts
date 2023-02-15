import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { loggingService } from '../_Common/services/logging.services';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: []
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup|any;
  token: any;
constructor(private logIn:loggingService){

}
  ngOnInit(): void{
this.loginForm = new FormGroup ({
  'email': new FormControl(null ,Validators.required),
  'password': new FormControl(null, Validators.required)
});
  }
onSubmit(){

 return this.logIn.logIn(this.loginForm.get('email').value, this.loginForm.get('password').value);
}
}
