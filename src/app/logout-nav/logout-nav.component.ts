import { Component } from '@angular/core';
import { loggingService } from '../_Common/services/logging.services';

@Component({
  selector: 'app-logout-nav',
  templateUrl: './logout-nav.component.html',
  styleUrls: ['./logout-nav.component.css']
})
export class LogoutNavComponent {

  constructor(private logOut:loggingService){
  }
  onclick(){
   this.logOut.logout(); 
  }// call teh logging service logout method
}
