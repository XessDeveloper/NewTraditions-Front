import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-delete-button-renderer',
  templateUrl: './delete-button-renderer.component.html',
  styleUrl: './delete-button-renderer.component.scss'
})
export class DeleteButtonRendererComponent implements ICellRendererAngularComp {
  params: any;

  agInit(params: ICellRendererParams<any, any, any>) { this.params = params }
  refresh(params: ICellRendererParams<any, any, any>) { return false }
}
