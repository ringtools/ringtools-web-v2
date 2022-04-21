import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { DonationComponent } from '../donation/donation.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  testnet = environment.networkClass == 'testnet';

  constructor(
    private modalService: NgbModal,
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
  ) {}

  openDonationModal($event) {
    $event.preventDefault();
    const modalRef = this.modalService.open(DonationComponent, { size: 'md' });
    modalRef.componentInstance.name = 'Donation';
  }    
}
