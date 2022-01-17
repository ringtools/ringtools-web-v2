import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './notification/toast/toast.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    ToastComponent
  ],
  imports: [
    NgbToastModule,
    CommonModule
  ],
  exports: [
    ToastComponent
  ]
})
export class SharedModule { }
