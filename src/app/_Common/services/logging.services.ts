import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {Injectable} from '@angular/core';
import { catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';
import { environment } from "src/environments/environment";


@Injectable()
export class loggingService {
bearerToken:any; //to store the token
responses:any; // manipulate the responses recieved
responseCode: any; // manipulate http response code
email:any //to store logged person email

constructor(private http: HttpClient, private router: Router){

}

//this method will take in 4 args passed and calls the api to post data and retrives a bearer token as response.
sigUp(email:any, password:any, confirmed_password:any, name='sayu'){
    var navigate: any = false;
    var data = {
    'email' : email,
    'password' : password,
    'password_confirmation' : confirmed_password,
    'name' : name
}; //data to be passed must be exact as above for the api link

var response = this.http.post<ResponseType>(`${environment.domain}signup`,data, { observe: 'response' }).
pipe(map( response => {
    this.responses = response;
    this.responseCode = response.status;

    if (this.responseCode === 201){
        this.bearerToken = this.responses.body.token;
        this.email=data.email;
        return this.bearerToken;
    }    
  }), catchError(error => {
    alert("THE EMAIL HAS BEEN TAKEN");
    return throwError (error);
  })).subscribe(response => { 
  this.router.navigate(['/dashboard']);
  });

      
};


logIn(email:any, password:any){
    var navigate: any = false;
    var data = {
    'email' : email,
    'password' : password,
    
}; //data to be passed must be exact as above for the api link

this.http.post<ResponseType>(`${environment.domain}login`,data, { observe: 'response' }).
pipe(map( response => {
    this.responses = response;
    this.responseCode = response.status;

    if (this.responseCode === 201){
        this.bearerToken = this.responses.body.token;
        this.email=data.email;
        return this.bearerToken;
    }    
  }), catchError(error => {
    alert("Not Authorized");
    return throwError (error);
  })).subscribe(response => { 
  this.router.navigate(['/dashboard']);
  });//passes the value to the route designed in laravel, token is very important
};

//this method logs you out 

logout() {
  if (true) {
  
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.bearerToken
    });

    this.http.post(`${environment.domain}logout`, {} , { headers }).subscribe(
      (response) => {
        this.responses = response;
        if (this.responses['message'] === 'logged out') {
          this.router.navigate(['/']);
          this.bearerToken = null;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
}