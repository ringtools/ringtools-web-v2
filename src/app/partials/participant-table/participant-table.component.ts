import { Component, Input, OnInit, Sanitizer } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { NodeOwner } from 'src/app/models/node-owner.model';
import { IRing } from 'src/app/models/ring.model';
import { NodeOwnersState } from 'src/app/reducers/node-owner.reducer';
import { SettingState } from 'src/app/reducers/setting.reducer';
import { selectSettings } from 'src/app/selectors/setting.selectors';
import { colorScale } from 'src/app/utils/utils';
import * as fromRoot from '../../reducers';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';
import { DomSanitizer } from '@angular/platform-browser';
import { JsonPipe } from '@angular/common';
import { RoutingPolicy } from 'src/app/models/routing_policy.model';
import { NgbPopover, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import * as bolt07 from 'bolt07';

hljs.registerLanguage('json', json);

@Component({
  selector: 'app-participant-table',
  templateUrl: './participant-table.component.html',
  styleUrls: ['./participant-table.component.scss']
})
export class ParticipantTableComponent {
  _participants = new BehaviorSubject<IRing>([]);
  settings!: SettingState;

  @Input()
  set participants(value:any) {
    this._participants.next(value);
  };

  get participants() {
    return this._participants.getValue();
  }


  constructor(
    private store: Store<fromRoot.State>,
    private sanitizer: DomSanitizer,
    private jsonPipe: JsonPipe,
    popoverConfig: NgbPopoverConfig
  ) { 
    this.store.select(selectSettings).subscribe((settings: SettingState) => {
      this.settings = settings;
    });

    popoverConfig.container = 'body';
  }

  getColor(i: any) {
    return colorScale(i);;
  }

  getUsername(item: NodeOwner) {
    return item.pub_key;
  }

  channelInfo(item:IRing) {
    console.log(hljs.highlight(this.jsonPipe.transform(item[3][0]), { language: 'json' }).value);

    return this.sanitizer.bypassSecurityTrustHtml(hljs.highlight(this.jsonPipe.transform(item[3][0]), { language: 'json' }).value);
  }

  routingPolicyPopover(popover: NgbPopover, policy: RoutingPolicy, nodeOwner: NodeOwner) {
    if (popover.isOpen()) {
      popover.close()
    } else {
      popover.open({
        title: `${nodeOwner.username_or_name}`,
        value: this.sanitizer.bypassSecurityTrustHtml(hljs.highlight(this.jsonPipe.transform(policy), { language: 'json' }).value)
      })
    }
  }

  getChannelId(channelId: number) {
    if (!channelId) return;
    // FIXME bolt07 package doesn't work correctly with browser buffer implementation
    if (this.settings.useShortChannelIds) {
      let number = channelId;
      try {
      return bolt07.decodeChanId( { number });
      } catch(err) {
        console.log('Error converting', err)
        return channelId;
      }
    } else {
      return channelId;
    }
  }
}
