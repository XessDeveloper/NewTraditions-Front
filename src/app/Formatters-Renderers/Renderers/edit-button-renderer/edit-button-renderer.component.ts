import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-edit-button-renderer',
  templateUrl: './edit-button-renderer.component.html',
  styleUrl: './edit-button-renderer.component.scss'
})
export class EditButtonRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: ICellRendererParams<any, any, any>) { this.params = params }
  refresh(params: ICellRendererParams<any, any, any>) { return false }
}
