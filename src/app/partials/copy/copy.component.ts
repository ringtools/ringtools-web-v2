import { Component, Input, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.scss']
})
export class CopyComponent implements OnInit {
  @Input() value!:string;

  constructor(
    private _clipboardService: ClipboardService
  ) { }

  ngOnInit(): void {
  }

  copy(){
    this._clipboardService.copy(this.value)
  }
}
