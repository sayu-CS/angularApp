import { NgModule } from '@angular/core';


import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatFormFieldModule, } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list'




@NgModule({
  declarations: [],
  imports: [
    MatSlideToggleModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule
    
    ],
  exports: [
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule ,
    MatGridListModule 
  ]
})
  
export class MaterialModule { }

//for material UI easy to manipulate if seperate module