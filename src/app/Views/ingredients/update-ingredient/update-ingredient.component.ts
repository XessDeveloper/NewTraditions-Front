import { Component, OnInit } from '@angular/core';
import { IIngredient } from '../../../Models/ingredient/i-ingredient';
import { SharedServicesService } from '../../../Services/shared/shared-services.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-ingredient',
  templateUrl: './update-ingredient.component.html',
  styleUrl: './update-ingredient.component.scss'
})
export class UpdateIngredientComponent implements OnInit {
  subscriptions: Subscription = new Subscription()

  ingredientToModify: IIngredient = {
    id: 0,
    name: '',
    price: 0
  }

  constructor(private sharedService: SharedServicesService) {}

  updateIngredient() {

  }

  cancel() {
    Swal.fire({
      title: "¿Estas seguro que quieres salir?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Salir",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) window.history.back();
    })
  }

  //changeInputChangedStatus = (nameField: string) => this.inputTouched[nameField] = true;
  //isInputTouched = (nameField: string) => !!this.inputTouched[nameField]
  ngOnInit() { this.ingredientToModify = this.sharedService.selectedItemParam; }
  ngOnDestroy = () => this.subscriptions.unsubscribe();
}
