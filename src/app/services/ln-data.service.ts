import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { NodeInfo } from '../models/node-info.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LnDataService {
  socket: Socket<any, any>;
  nodeSocket: Socket<any, any>;
  channelSocket: Socket<any, any>;

  constructor(private http: HttpClient) { 
    const url = 'http://localhost:7464';
    this.socket = io(url)
    this.nodeSocket = io(`${url}/node`)
    this.channelSocket = io(`${url}/channel`)
  }

  getNodeInfo(pubKey: string) {
    return this.http.get<NodeInfo>(
      `http://localhost:7464/node/${pubKey}`
    );
  }
}
