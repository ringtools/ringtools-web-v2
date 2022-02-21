import { Component, HostBinding, OnInit, TemplateRef } from '@angular/core';
import { Toast } from './toast.model';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
//  host: {'class': 'toast-container position-fixed top-0 end-0 p-3', 'style': 'z-index: 1200'}
})
export class ToastComponent {
  @HostBinding('class.toast-container')
  @HostBinding('class.position-fixed')
  @HostBinding('class.top-0')
  @HostBinding('class.end-0')
  @HostBinding('class.p-3')
  @HostBinding('style.z-index')
  zIndex = 1200;

  readonly ngbToasts = true;

  constructor(public toastService: ToastService) {}

  isTemplate(toast: Toast) { return toast.textOrTpl instanceof TemplateRef; }
}
