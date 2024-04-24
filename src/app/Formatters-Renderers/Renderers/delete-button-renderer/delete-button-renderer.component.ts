import { Component, EventEmitter, inject, Injector, Input, Output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { IngredientsService } from '../../../Services/ingredients/ingredients.service';
import { PlatesService } from '../../../Services/plates/plates.service';
import { HelpMethods } from '../../../HelpMethods/help-methods';

@Component({
  selector: 'app-delete-button-renderer',
  templateUrl: './delete-button-renderer.component.html',
  styleUrl: './delete-button-renderer.component.scss'
})
export class DeleteButtonRendererComponent implements ICellRendererAngularComp {
  private readonly helpMethod = inject(HelpMethods);
  private readonly injector = inject(Injector);

  @Input() currentUrl: any;
  @Output() gridRefresh = new EventEmitter<void>()
  paramsRenderer: any;

  deleteClicked = (itemClicked: any) => {
    this.helpMethod.showSwalDelete( () => this.CallDeleteMethodFromCorrectService(itemClicked))
  }

  CallDeleteMethodFromCorrectService = (itemClicked: any) => {
    const service = this.getService(this.currentUrl);
    const Id = itemClicked.id

    if (service) {
      service.DeleteIngredient(Id).subscribe( (response: any) => {
            this.helpMethod.showSwalResponses({
              isSuccessfull: true,
              message: response.message, 
              statusCode: response.statusCode,
              okAction: () => { window.location.reload(); }
            }) 
        }
      ),
      (errorResponse: any) => {
        this.helpMethod.showSwalResponses({
          isSuccessfull: false, 
          message: errorResponse.error.message, 
          statusCode: errorResponse.statusCode
        })
      }
    }
  }

  //En base a la URL actual, obtener el servicio correspondiente 
  getService(url: string): any {
    switch(url) {
      case '/ingredientes': return this.injector.get(IngredientsService);
      case '/platos': return this.injector.get(PlatesService);
      default: return null;
    }
  }

  agInit(params: ICellRendererParams<any, any, any>) { 
    this.paramsRenderer = params
    this.currentUrl = this.paramsRenderer.currentUrl  
   }
  refresh(params: ICellRendererParams<any, any, any>) { return true }
}
