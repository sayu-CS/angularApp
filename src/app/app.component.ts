import { Component } from '@angular/core';
import { loggingService } from './_Common/services/logging.services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [loggingService]
})
export class AppComponent {
  title = 'project';
constructor (private login: loggingService){}; //for bearer token to be injected and email too all across the app
}
