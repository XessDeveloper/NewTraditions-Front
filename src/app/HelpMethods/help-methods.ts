import { NgForm } from "@angular/forms";
import { IIngredient } from "../Models/ingredient/i-ingredient";
import Swal from "sweetalert2";

export class HelpMethods {

    //#region Forms Methods
    resetFields(form: NgForm) {
        form.resetForm();
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

    //#endregion

    //#region Validations Forms

    //maxFiveDigitsWithMaxTwoDecimals = (price: string) => /^(?:\d{1,5}|\d{1,4}(?:\.\d)?|\d{1,3}(?:\.\d{1,2})?)$/.test(price);
    nameValidation = (name: string) => name !== null && name.trim() !== "";
    priceValidation = (price: number) => price <= 0.00 ? false : true
    //#endregion

    //#region Grid Formatters
    priceFormatter(ingredient: IIngredient[]) {
        return ingredient.map(ing => {
            return { ...ing, price: ing.price + '€' };
        });
    }

    //#endregion

    //#region Swal Methods

    showSwalResponses(options: { isSuccessfull: boolean, message: string, statusCode?: number, okAction?: () => void }) {
        const { isSuccessfull, message, statusCode, okAction } = options

        if (statusCode === 500) {
            let swalPromiseInternalError: Promise<any>;
            swalPromiseInternalError = Swal.fire({ icon: 'error', text: 'Ha habido un error interno'})
            if (okAction) swalPromiseInternalError.then(okAction)
        }
        // Hacemos una promesa la cual nos permite continuar despues de hacerle click en el boton
        let swalPromise: Promise<any>;

        if (isSuccessfull) swalPromise = Swal.fire({ icon: 'success', text: message })
        else swalPromise = Swal.fire({ icon: 'error', text: message })

        if (okAction) swalPromise.then(okAction)
    }

    // Unicamente se hace la accion despues de darle al ok, si se le pasa un lambda
    showSwalDelete(confirmAction?: () => void) {
        Swal.fire({
            title: '¿Estas seguro que quieres eliminar el elemento?',
            text: 'Esta acción no puede ser revertida',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Estoy seguro',
            cancelButtonText: 'Cancelar'
          }).then(result => {
            if (result.isConfirmed && confirmAction) confirmAction();
          })

        }

    //#endregion
}