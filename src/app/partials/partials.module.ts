import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileExporterComponent } from './file-exporter/file-exporter.component';
import { EditRingOrderComponent } from './edit-ring-order/edit-ring-order.component';
import { DragulaModule } from 'ng2-dragula';
import { ReorderParticipantsComponent } from './reorder-participants/reorder-participants.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { NodeConnectionsComponent } from './node-connections/node-connections.component';
import { VisModule } from '../vis/vis.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    FileExporterComponent,
    EditRingOrderComponent,
    ReorderParticipantsComponent,
    NodeConnectionsComponent
  ],
  imports: [
    HttpClientModule,
    VisModule,
    FormsModule,
    SharedModule,
    DragulaModule.forRoot(),
    CommonModule
  ],
  exports: [
    FileExporterComponent,
    EditRingOrderComponent,
    ReorderParticipantsComponent,
    NodeConnectionsComponent
  ]
})
export class PartialsModule { }
