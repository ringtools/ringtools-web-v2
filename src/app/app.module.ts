import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './reducers';
import { AppEffects } from './app.effects';
import { HomeComponent } from './components/home/home.component';
import { OverviewComponent } from './components/overview/overview.component';
import { VisualComponent } from './components/visual/visual.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParticipantTableComponent } from './components/participant-table/participant-table.component';
import { ParticipantRingComponent } from './components/participant-ring/participant-ring.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OverviewComponent,
    VisualComponent,
    SettingsComponent,
    ParticipantTableComponent,
    ParticipantRingComponent
  ],
  imports: [
    SharedModule,
    LayoutModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
