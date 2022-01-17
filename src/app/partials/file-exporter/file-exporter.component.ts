import { Component, OnInit } from '@angular/core';
import { ExportFile } from 'src/app/models/export_file.enum';
import { FileService } from 'src/app/services/file.service';
import { RingDataService } from 'src/app/services/ring-data.service';

@Component({
  selector: 'app-file-exporter',
  templateUrl: './file-exporter.component.html',
  styleUrls: ['./file-exporter.component.scss'],
})
export class FileExporterComponent {
  constructor(private file: FileService, private ringData: RingDataService) {}

  persistOrder() {
    this.ringData.doAction('persistOrder');
  }

  async downloadChannelsTxt() {
    this.file.generateAndDownload(
      ExportFile.RingToolsChannelsTxt,
      await this.ringData.getRing()
    );
  }

  async downloadPubKeysTxt() {
    this.file.generateAndDownload(
      ExportFile.RingToolsPubKeysTxt,
      await this.ringData.getRing()
    );
  }

  async downloadIgniterPubkeys() {
    this.file.generateAndDownload(
      ExportFile.IgniterPubkeys,
      await this.ringData.getRing()
    );
  }
}
