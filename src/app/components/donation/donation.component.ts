import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LnDataService } from 'src/app/services/ln-data.service';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss'],
})
export class DonationComponent {
  lnInvoice!: string;
  expiry!: number;

  donateForm = new UntypedFormGroup({
    amountSats: new UntypedFormControl(''),
    message: new UntypedFormControl(''),
  });
  buttonEnabled: boolean = true;

  constructor(
    public activeModal: NgbActiveModal,
    private lnDataService: LnDataService,
    private sanitizer: DomSanitizer
  ) {}

  getlnInvoiceUrl() {
    return `lightning:${this.lnInvoice}`;
  }

  getSafeLnInvoiceUrl() {
    return this.sanitizer.bypassSecurityTrustUrl(this.getlnInvoiceUrl());
  }

  donateLn() {
    const amount = this.donateForm.get('amountSats')?.value;
    const message = this.donateForm.get('message')?.value;
    this.buttonEnabled = false;
    
    this.lnDataService.donate(amount, message).subscribe({
      next: (data) => {
        this.lnInvoice = data.invoice;
        this.expiry = data.expiry;
      },
      error: (error) => {
        this.donateForm.controls['amountSats'].setErrors({ incorrect: true });
        this.buttonEnabled = true;
      },
      complete: () => {
        this.buttonEnabled = true;
      }
    });
  }
}
