import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { loggingService } from "./logging.services";
import { environment } from "src/environments/environment";

@Injectable()
export class dataService {

    constructor(private extracted:loggingService, private http: HttpClient){}
    email=this.extracted.email; //this email gets stored in loggingService and is the email of logged in user is retrived from there
    data:any;//this is a place holder for the data to be manipulated

   async show(){
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.extracted.bearerToken
          });//storing bearer token so that can be passed below
        const response = await this.http.get(`${environment.domain}get?email=${this.email}`, {headers}).toPromise()
        .then(
          response => {
            this.data = response;
          }//we get a response from the server when we go to the above api endpoint
        );//the function is being called from mainpage
       
        return (this.data)
    }
    async edit(id:any, heading:any, description:any){
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.extracted.bearerToken
          });
          const response = await this.http.put(`${environment.domain}edit_items/${id}/${this.email}?heading=${heading}&description=${description}`,{}, {headers}).toPromise()
        .then(
          response => {
           this.show();
          }//we get a response from the server when we go to the above api endpoint
        );//the function is being called from mainpage
        
        return (this.data)
    }
    async add(heading:any, description:any){
      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.extracted.bearerToken
        });
        const response = await this.http.post(`${environment.domain}add_items/?email=${this.email}&heading=${heading}&description=${description}`,{}, {headers}).toPromise()
      .then(
        response => {
          
        }
      );//the function is being called from mainpage
     }
     async delete(id:any){
      const headers = new HttpHeaders({
          'Authorization': 'Bearer ' + this.extracted.bearerToken
        });
        const response = await this.http.delete(`${environment.domain}delete/${id}`,{headers}).toPromise()
      .then(
        response => {
          
        }
      );//the function is being called from mainpage
     }
  }
