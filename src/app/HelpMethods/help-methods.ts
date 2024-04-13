import { NgForm } from "@angular/forms";
import { IIngredient } from "../Models/ingredient/i-ingredient";
import Swal from "sweetalert2";

export class HelpMethods {
    resetFields(form: NgForm) {
        form.resetForm();
    }

    priceFormatter(ingredient: IIngredient[]) {
        return ingredient.map(ing => {
            return { ...ing, price: ing.price + '€' };
        });
    }

    cancelButtonForm() {
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
}