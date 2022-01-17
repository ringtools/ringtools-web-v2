import { Injectable } from '@angular/core';
import { ToastService } from '../shared/notification/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toast: ToastService) { 

  }

  showSuccess(message: string) {
    this.toast.show(`${message}`, {
      classname: 'bg-success',
    });
  }

  show(message: string, options: any) {
    this.toast.show(`${message}`, options);
  }
}
