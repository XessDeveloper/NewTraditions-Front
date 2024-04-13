import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { SharedServicesService } from '../../../Services/shared/shared-services.service';

@Component({
  selector: 'app-edit-button-renderer',
  templateUrl: './edit-button-renderer.component.html',
  styleUrl: './edit-button-renderer.component.scss'
})
export class EditButtonRendererComponent implements ICellRendererAngularComp {

  constructor(private router: Router, private sharedService: SharedServicesService) {}

  @Input() currentUrl: any;
  paramsRenderer: any;

  editClicked = (itemClicked: any) => {
    this.sharedService.selectedItemParam = itemClicked;
    const itemId = itemClicked.id
    this.router.navigate([`${this.currentUrl}/modificar/${itemId}`])
  }

  agInit(params: ICellRendererParams<any, any, any>) { 
    this.paramsRenderer = params 
    this.currentUrl = this.paramsRenderer.currentUrl  
  }
  refresh(params: ICellRendererParams<any, any, any>) { return false }
}
