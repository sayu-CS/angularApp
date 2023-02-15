import { HttpClient,HttpHeaders  } from '@angular/common/http';

import { Component, OnInit, AfterContentInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { dataService } from '../_Common/services/data.service';
import { loggingService } from '../_Common/services/logging.services';
import { environment } from 'src/environments/environment';
import { Translate } from '@google-cloud/translate/build/src/v2';


@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
  providers:[dataService]
 
})
export class MainpageComponent implements OnInit {

mainPageForm: FormGroup | any; // for the add your task form
searchForm: FormGroup | any;// for the serch bar form
editForm: FormGroup | any;// for the edit form option that gets triggerd when edit button is clicked
res: any; // empty array in case of emergency while in dev
data: any;//data to be manipulated here
imageUrl = `https://random.imagecdn.app/500/150`;//random image just to look nice has no importance
displayEditForm:any = false;// to toggle the edit form when edit button is clicked
storeId:any;// store the id that is being passed when the edit button is clicked this also helps to toggle the form
searchToggle= false;//toggles the search result
filteredData:any;//keeps the searched data
translated:any;
translation =false;// this gets trigged on translation button to display the translated result
storeTranslationID:any; //this will store the id that gets from the translate button


constructor(private http: HttpClient,private auth:loggingService, private route: Router, private extract:dataService){
//logging services holds token and email being logged in and dataservice to CRUD data to the laravel server
};

ngOnInit(){
  if (!this.auth.bearerToken) {
    this.route.navigate(['/']);
  }
this.mainPageForm = new FormGroup ({
  'heading' : new FormControl(null, Validators.required),
  'description': new FormControl(null, Validators.required)
});
this.editForm = new FormGroup ({
  'heading' : new FormControl(null),
  'description': new FormControl(null)
});
this.searchForm = new FormGroup({
  'search' : new FormControl(null)
});
this.data = this.extract.show();//this is to get the data from the logging service havent made observable can work on that

}

onEdit(id:any){
this.storeId = id;
this.displayEditForm =!this.displayEditForm;

};//helps to toggle the form input you can look the logic in ngif where this is onedit is used

onFormClicked(){
this.extract.add(this.mainPageForm.get('heading').value, this.mainPageForm.get('description').value);
this.data = this.extract.show();
this.mainPageForm.reset();
};// this is for the mainpage form which helps to add task gets trigged when button is clicked could do in ngsubmit of the form but its here so!!

onDelete(id: any){
this.extract.delete(id);
this.data = this.extract.show();
}//gets triggered when delete button is clicked


onTaskAddedAgain(id:any,head:any, des:any){
  var heading:any;
var description: any;
  if(this.editForm.get('heading').value === null){
  heading = head;
}else{
  heading = this.editForm.get('heading').value;
};
if(this.editForm.get('description').value === null){
  description = des;
}else{
  description = this.editForm.get('description').value;
};

this.extract.edit(id,heading,description);
this.data = this.extract.show();
this.editForm.reset();
this.displayEditForm =!this.displayEditForm;
};// gets triggerd when the submit button is clicked after editing the form 

onSearched(){
  let data = this.extract.data;
  let searchTerm = this.searchForm.get('search').value;
  this.searchToggle =!this.searchToggle
this.filteredData = data.filter((item:any) => {
    return item.heading.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase());
  });
if(this.filteredData.length===0){
  alert("no match")
}
console.log(this.filteredData)
}

onTranslate(heading:any, description:any, id:any){
 
let value=   this.http.post(`https://translation.googleapis.com/language/translate/v2?key=${environment.API_KEY}`,{
    "q":[heading,description],
    "target": "de"
   }).subscribe((response:any) => {
this.translated = response.data.translations[0].translatedText;
this.translation = true;
this.storeTranslationID = id;
console.log(this.translated)
   })
    
  
}

onTaskAdded(){}// has no significance only to satisfy ngsubmit on add your task part

}