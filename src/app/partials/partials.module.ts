import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FileExporterComponent } from './file-exporter/file-exporter.component';
import { EditRingOrderComponent } from './edit-ring-order/edit-ring-order.component';
import { DragulaModule } from 'ng2-dragula';
import { ReorderParticipantsComponent } from './reorder-participants/reorder-participants.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NodeConnectionsComponent } from './node-connections/node-connections.component';
import { VisModule } from '../vis/vis.module';
import { HttpClientModule } from '@angular/common/http';
import { ParticipantRingComponent } from './participant-ring/participant-ring.component';
import { ParticipantTableComponent } from './participant-table/participant-table.component';
import { NgbPopoverModule, NgbTooltip, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { QrCodeComponent } from './qr-code/qr-code.component';
import { CopyComponent } from './copy/copy.component';
import { ClipboardModule } from 'ngx-clipboard';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    ParticipantRingComponent,
    ParticipantTableComponent,
    FileExporterComponent,
    EditRingOrderComponent,
    ReorderParticipantsComponent,
    NodeConnectionsComponent,
    QrCodeComponent,
    CopyComponent
  ],
  providers: [JsonPipe],
  imports: [
    CommonModule,
    NgbPopoverModule,
    NgbTooltipModule,
    HttpClientModule,
    VisModule,
    FormsModule,
    SharedModule,
    ClipboardModule,
    TranslateModule,
    DragulaModule.forRoot(),
  ],
  exports: [
    ParticipantRingComponent,
    ParticipantTableComponent,
    FileExporterComponent,
    EditRingOrderComponent,
    ReorderParticipantsComponent,
    NodeConnectionsComponent,
    QrCodeComponent,
    CopyComponent
  ]
})
export class PartialsModule { }
