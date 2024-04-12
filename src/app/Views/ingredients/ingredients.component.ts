import { Component, OnInit } from '@angular/core';
import { IngredientsService } from '../../Services/ingredients/ingredients.service';
import { IIngredient } from '../../Models/ingredient/i-ingredient';
import { ColDef, GridOptions, GridReadyEvent } from 'ag-grid-community';
import { EditButtonRendererComponent } from '../../Formatters-Renderers/Renderers/edit-button-renderer/edit-button-renderer.component';
import { DeleteButtonRendererComponent } from '../../Formatters-Renderers/Renderers/delete-button-renderer/delete-button-renderer.component';
import { HelpMethods } from '../../HelpMethods/help-methods';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.scss'
})
export class IngredientsComponent  {
  itemClicked: IIngredient = { id: 0, name: "", price: 0 }
  currentUrl: string = ""

  rowData: any[] = []
  colDefs: ColDef[] = [
    { headerName: "ID", field: 'id', hide: true },
    { headerName: "Nombre" , field: 'name', headerClass: 'text-center' },
    { headerName: "Precio", field: 'price', headerClass: 'text-center' },
    { cellStyle: { textAlign: 'center' }, cellRenderer: EditButtonRendererComponent, cellRendererParams: { currentUrl: this.router.url }  },
    { cellStyle: { textAlign: 'center' }, cellRenderer: DeleteButtonRendererComponent }
  ]
  gridOptions: GridOptions = {
    domLayout: 'autoHeight',
    pagination: true,
    rowSelection: 'single'
  }

  ingredient: IIngredient = {
    id: 0,
    name: 'test',
    price: 15
  }

  constructor(private ingredientService: IngredientsService, private helpMethod: HelpMethods, private router: Router) { this.currentUrl = this.router.url }

  onGridReady(params: GridReadyEvent) {
    this.ingredientService.GetAllIngredients().subscribe(response => {
      this.rowData = this.helpMethod.priceFormatter(response.objects!);
      params.api.sizeColumnsToFit();
    });
  }

  InsertIngredient() {
      this.ingredientService.InsertIngredient(this.ingredient).subscribe(
        response => console.log(response)
      )
  }

  onEditButtonClicked() {

  }
}
