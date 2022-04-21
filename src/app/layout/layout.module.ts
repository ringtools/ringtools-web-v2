import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseLayoutComponent } from './base/base.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { NgbCollapseModule, NgbDropdownModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslatePipe } from '@ngx-translate/core';



@NgModule({
  declarations: [
    BaseLayoutComponent,
    NavigationComponent,
  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    SharedModule,
    NgbCollapseModule,
    NgbNavModule,
    NgbDropdownModule,
    TranslateModule
  ],
  exports: [
    BaseLayoutComponent, NavigationComponent
  ]
})
export class LayoutModule { }
