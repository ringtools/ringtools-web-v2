import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ringtools-web';

  constructor(translate: TranslateService) {
    // fallback language
    translate.setDefaultLang('en');

    translate.use('en');
  }
}
