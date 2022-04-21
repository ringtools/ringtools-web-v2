import { Component, Input, OnInit } from '@angular/core';
import QRCode from 'qrcode'

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss']
})
export class QrCodeComponent implements OnInit {
  @Input() qrData!:string;

  dataUrl!: string;

  constructor() { 
     
  }

  ngOnInit(): void {
    QRCode.toDataURL(this.qrData, { errorCorrectionLevel: 'H' },  (err: any, dataUrl: string) => {
      this.dataUrl = dataUrl;
    })
  }

}
