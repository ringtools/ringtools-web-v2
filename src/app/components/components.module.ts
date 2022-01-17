import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { OverviewComponent } from './overview/overview.component';
import { SettingsComponent } from './settings/settings.component';
import { VisualComponent } from './visual/visual.component';
import { SharedModule } from '../shared/shared.module';
import { PartialsModule } from '../partials/partials.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbButtonsModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RingOnlyComponent } from './ring-only/ring-only.component';



@NgModule({
  declarations: [
    HomeComponent,
    OverviewComponent,
    SettingsComponent,
    VisualComponent,
    RingOnlyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NgbButtonsModule,
    SharedModule,
    PartialsModule
  ],
  exports: [
    HomeComponent,
    OverviewComponent,
    SettingsComponent,
    VisualComponent
  ],
})
export class ComponentsModule { }
