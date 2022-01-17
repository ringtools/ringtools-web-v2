import { Component, OnInit } from '@angular/core';
import { ExportFile } from 'src/app/models/export_file.enum';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-file-exporter',
  templateUrl: './file-exporter.component.html',
  styleUrls: ['./file-exporter.component.scss']
})
export class FileExporterComponent {

  constructor(
    private file: FileService
  ) { }

  persistOrder() {
    console.log('Method not implemented');
}

  downloadChannelsTxt() {
    this.file.generateAndDownload(ExportFile.RingToolsChannelsTxt);
  }

  downloadPubKeysTxt() {
    this.file.generateAndDownload(ExportFile.RingToolsPubKeysTxt);
  }

  downloadIgniterPubkeys() {
    this.file.generateAndDownload(ExportFile.IgniterPubkeys);
  }
}
