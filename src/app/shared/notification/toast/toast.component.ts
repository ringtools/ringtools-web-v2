import { Component, OnInit, TemplateRef } from '@angular/core';
import { Toast } from './toast.model';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  constructor(public toastService: ToastService) {}

  isTemplate(toast: Toast) { return toast.textOrTpl instanceof TemplateRef; }
}
