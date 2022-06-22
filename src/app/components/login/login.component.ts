import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { SettingState } from 'src/app/reducers/setting.reducer';
import { selectSettings } from 'src/app/selectors/setting.selectors';
import { LnDataService } from 'src/app/services/ln-data.service';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup
  connecting = false

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>,
    private translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private lnData: LnDataService
  ) {
    this.loginForm = this.fb.group({
      password: ["", Validators.required],
      lncPassphrase: [""],
    })

    this.store.select(selectSettings).subscribe((settings: SettingState) => {
      this.translate.use(settings.locale)
    });
  }

  onSubmit() {
    const val = this.loginForm.value
    try {
      this.connecting = true

      if (!this.hasStoredPassphrase()) {
        this.lnData.setPassword(val.lncPassphrase, val.password)
      }

      this.lnData.lncConnect(val.password).then(() => {
        let returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');

        if (returnUrl) {
          let url = new URL(decodeURIComponent(returnUrl), window.location.protocol + "//" + window.location.host)
          this.router.navigate([url.pathname], { queryParams:  Object.fromEntries(url.searchParams) } )
        } else {
          this.router.navigate([''])
        }
      }).catch(() => {
        this.connecting = false

        console.log('LNC error')
        this.loginForm.setErrors({
          invalid: true,
        })
      })

    } catch (e) {
      this.connecting = false
      this.loginForm.setErrors({
        invalid: true,
      })
      console.log('err', e)
    }
  }

  clearPassphrase() {
    localStorage.removeItem('lnc-web:default')
  }

  hasStoredPassphrase(): boolean {
    return localStorage.getItem('lnc-web:default') !== null
  }
}
