import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class LnDataService {
  socket: Socket<any, any>;
  nodeSocket: Socket<any, any>;
  channelSocket: Socket<any, any>;

  constructor() { 
    const url = 'http://localhost:7464';
    this.socket = io(url)
    this.nodeSocket = io(`${url}/node`)
    this.channelSocket = io(`${url}/channel`)
  }
}
