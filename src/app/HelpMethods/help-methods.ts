import { NgForm } from "@angular/forms";
import { IIngredient } from "../Models/ingredient/i-ingredient";

export class HelpMethods {
    resetFields(form: NgForm) {
        form.resetForm();
    }

    priceFormatter(ingredient: IIngredient[]) {
        return ingredient.map(ing => {
            return { ...ing, price: ing.price + '€' };
        });
    }
}