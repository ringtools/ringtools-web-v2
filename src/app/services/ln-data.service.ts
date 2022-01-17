import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { NodeInfo } from '../models/node-info.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LnDataService {
  socket: Socket<any, any>;
  nodeSocket: Socket<any, any>;
  channelSocket: Socket<any, any>;

  readonly apiEndpoint = environment.apiEndpoint;

  constructor(private http: HttpClient) {;
    this.socket = io(this.apiEndpoint);
    this.nodeSocket = io(`${this.apiEndpoint}/node`);
    this.channelSocket = io(`${this.apiEndpoint}/channel`);
  }

  getNodeInfo(pubKey: string) {
    return this.http.get<NodeInfo>(`${this.apiEndpoint}/node/${pubKey}`);
  }

  getNodeInfoAsync(pubKey: string) {
    return firstValueFrom(this.getNodeInfo(pubKey));
  }
}
