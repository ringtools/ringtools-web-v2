import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import LNC from '@lightninglabs/lnc-web';
import { ChannelEdge, GetInfoResponse, GraphTopologyUpdate, NodeInfo as NodeInfoLnd, Route } from '@lightninglabs/lnc-web/dist/types/proto/lnrpc';
import EventEmitter from 'events';

@Injectable({
  providedIn: 'root',
})
export class LnDataService {
  emitter!: EventEmitter;
  lnc!: LNC;

  lncIsConnected = false
  lncNodeInfo!: GetInfoResponse

  readonly apiEndpoint = environment.apiEndpoint;

  constructor(private http: HttpClient) {
    this.emitter = new EventEmitter()

  }

  setPassword(pairingPhrase: string, password: string) {
    this.lnc = new LNC({
      pairingPhrase,
      password
      });
  }

  lncConnect(password) {
    this.lnc = new LNC();

    this.lnc.credentials.password = password


    let prom = this.lnc.connect();
    
    prom.then(() => {
      this.lncIsConnected = true

      this.lnc.lnd.lightning.getInfo().then((res: GetInfoResponse) => {
        this.emitter.emit('connected', res)
        this.lncNodeInfo = res
      })

      this.lnc.lnd.lightning.subscribeChannelGraph(undefined, (msg: GraphTopologyUpdate) => {
        if (msg.nodeUpdates) {
          for (let n of msg.nodeUpdates) {
            this.emitter.emit('node', n);
          }
        }

        if (msg.channelUpdates) {
          for (let u of msg.channelUpdates) {
            this.emitter.emit('channel', u);
          }
        }
      })
    })

    this.emitter.on('subscribe_node', (nodes) => {
      for (let n of nodes) {
        this.getNodeInfo(n).subscribe({
          next: (res) => {
          this.emitter.emit('node', res);
        }, 
         error: (err) => {
          console.log('subscribe node error')
        }
      })
      }
    })

    this.emitter.on('subscribe_channel', (nodes) => {
      for (let n of nodes) {
        this.getChannelInfo(n).subscribe({ next: (res) => {
          this.emitter.emit('channel', res);
        }, error: (err) => {
          console.log('subscribe channel error', n)
        }})
      }
    })

    return prom;
  }

  isAuthenticated(): boolean {
    return this.lnc && this.lnc.isConnected
  }

  getNodeInfo(pubKey: string): Observable<NodeInfoLnd> {
    return from(this.lnc.lnd.lightning.getNodeInfo({ pubKey, includeChannels: true }))
  }

  getChannelInfo(chanId: string): Observable<ChannelEdge> {
    return from(this.lnc.lnd.lightning.getChanInfo({ chanId }))
  }

  getNodeInfoAsync(pubKey: string) {
    return firstValueFrom(this.getNodeInfo(pubKey));
  }

  probeRoute(amtMsat: string, hopPubkeys: string[], outgoingChanId: string) {
    return from(this.lnc.lnd.router.buildRoute({ 
      amtMsat,
      hopPubkeys,
      outgoingChanId
    }))
  }

  createBalanceInvoice(amtMsat: string, memo: string) {
    return from(this.lnc.lnd.lightning.addInvoice({ 
      valueMsat: amtMsat,
      memo
    }))
  }

  ignite(paymentHash: string, route: Route) {
    return from(this.lnc.lnd.router.sendToRouteV2({ 
      paymentHash,
      route
    }))
  }

  donate(sats: number, message?: string) {
    return this.http.post<{ invoice: string, expiry: number }>(`${this.apiEndpoint}/donate`, { sats, message });
  }
}
