import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './notification/toast/toast.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';



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
