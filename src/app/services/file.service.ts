import { Injectable } from '@angular/core';
import { ExportFile } from '../models/export_file.enum';
import { NodeOwner } from '../models/node-owner.model';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor() {}

  convertToCsv(ringParticipants:NodeOwner[], header: boolean = true) {
    let pkContents = '';

    if (header)
      pkContents = 'user_name,nodename,pub_key,new,handle,capacity_sat\r\n';

    for (let p of ringParticipants) {
      pkContents += `${p.first_name},${p.nodename},${p.pub_key},false,${p.username},0\r\n`;
    }

    return pkContents;
  }

  /**
   * CSV
   * @returns
   */
  parseCsvToType(contents: string) {
    let segmentLines = contents.split('\n');
    let segments: NodeOwner[] = [];
    for (let line of segmentLines.slice(1)) {
      let parts = line.split(',');
      if (parts.length > 1) {
        let nodeOwner: NodeOwner = {
          first_name: parts[0],
          nodename: parts[1],
          pub_key: parts[2],
          username: parts[4],
          username_or_name: undefined
        };
        segments.push(nodeOwner);
      }
    }
    return segments;
  }

  doDownloadFileWithData(data: string, filename: string) {
    let element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(data)
    );
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  convertToExportFormat(ringParticipants: NodeOwner[]) {
    let pkContents = '';
    let add = '';
    for (let p of ringParticipants) {
      pkContents += `${add}${p.first_name},${p.username},${p.pub_key},${p.nodename}`;
      add = "|";
    }

    return pkContents;
  }

  parseNewExportFormat(data: string) {
    let segmentLines = data.split('|');
    let segments: NodeOwner[] = [];
    for (let line of segmentLines) {
      let parts = line.split(',');
      if (parts.length > 1) {
        let nodeOwner:NodeOwner = {
          first_name: parts[0],
          username: parts[1],
          pub_key: parts[2],
          nodename: parts[3],
          username_or_name: undefined
        };
        segments.push(nodeOwner);
      }
    }
    return segments;
  }

  generateAndDownload(file_template: ExportFile) {

  }
}
