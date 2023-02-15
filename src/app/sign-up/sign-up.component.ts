import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { FormGroup, FormControl,FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { loggingService } from '../_Common/services/logging.services';

//Checks email typed is correct
export class EmailMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isTrue = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isTrue));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers:[]
})
export class SignUpComponent implements OnInit {

signUpForm: FormGroup |any; //FormGroup
emailCheckMatcher: any; //for email validity derived from EmailMatcher class later 
hide = true; //for the password visibility
passwrd: any = true; //Password strength added with ngif 
confirmPassword:any; //Confirm Password visibility
matched: any; // To match both passwords field


@ViewChild('password') passwordVal: ElementRef | any; //local ref @ password input field
@ViewChild('confirmPassword') confirmPasswordVal: ElementRef | any; //local ref @ confirm password input field


constructor(private signIn:loggingService){
this.confirmPassword = !this.passwrd;//alters the value for ngif @ confirmed password
};

  ngOnInit(): void {
  this.signUpForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null,Validators.required)
  });
  this.emailCheckMatcher = new EmailMatcher();
  }

  strengthChecker(){
   const password = this.passwordVal.nativeElement.value;
  
   const numberValidBoolean = /\d/.test(password);//is number true
   const minLenBoolean= password.length >= 8; //minimum length must be 8
   const upperCaseValidboolean = /[A-Z]/.test(password);//password must have uppercase
   const lowecaseValidBoolean = /[a-z]/.test(password);//password must have a lowercase
  
   const isValid = numberValidBoolean && minLenBoolean && upperCaseValidboolean && lowecaseValidBoolean;

   this.passwrd = isValid; //checks all the above conditions are met
   this.confirmPassword = this.passwrd; //alters the value at ngif for confirmedpassword
  
  };

  //checks if the confirmed password and the password matches
  passwordChecker(){
if (this.signUpForm.get('confirmPassword').value === this.signUpForm.get('password').value){
  this.matched = true; //if true matched is true and passed to ngif
}
else {
  this.matched = false;
}
  };


  onSubmit(){
    //makes ready for submission
var check_email= this.signUpForm.get('email').hasError('required'); //checks if there is email
var validate_email= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(this.signUpForm.get('email').value);//checks if the email format is right
//no need to check the password button is disabled unless matched and correct.

//calls the api if the values are true. and waits for the 

  return this.signIn.sigUp(this.signUpForm.get('email').value, this.signUpForm.get('password').value,this.signUpForm.get('confirmPassword').value);  


}
}