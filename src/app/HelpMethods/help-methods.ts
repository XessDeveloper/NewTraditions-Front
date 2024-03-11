import { NgForm } from "@angular/forms";

export class HelpMethods {
    resetFields(form: NgForm) {
        form.resetForm();
    }
}