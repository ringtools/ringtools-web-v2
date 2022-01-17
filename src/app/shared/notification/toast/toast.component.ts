import { Component, HostBinding, OnInit, TemplateRef } from '@angular/core';
import { Toast } from './toast.model';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  @HostBinding('class.ngb-toasts')
  readonly ngbToasts = true;

  constructor(public toastService: ToastService) {}

  isTemplate(toast: Toast) { return toast.textOrTpl instanceof TemplateRef; }
}
