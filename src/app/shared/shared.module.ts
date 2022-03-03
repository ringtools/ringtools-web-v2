import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './notification/toast/toast.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ToastComponent
  ],
  imports: [
    BrowserModule,
    NgbToastModule,
    CommonModule,
    TranslateModule
  ],
  exports: [
    ToastComponent
  ]
})
export class SharedModule { }
