import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OverviewComponent } from './components/overview/overview.component';
import { RingOnlyComponent } from './components/ring-only/ring-only.component';
import { SettingsComponent } from './components/settings/settings.component';
import { VisualComponent } from './components/visual/visual.component';
import { BaseLayoutComponent } from './layout/base/base.component';

const routes: Routes = [
  {
    path: '', component: BaseLayoutComponent,
    children: [
      {
        path: '', component: HomeComponent, pathMatch: 'full'
      },
      {
        path: 'settings', component: SettingsComponent
      },
      {
        path: 'overview', component: OverviewComponent
      },
      {
        path: 'visual', component: VisualComponent
      },
    ],
  }, {
    path: 'ring-only', component: RingOnlyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
