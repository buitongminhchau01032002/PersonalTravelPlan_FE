import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

type RegisterForm = {
    username?: string;
    password?: string;
};

@Component({
    selector: 'app-register-page',
    templateUrl: './register-page.component.html',
    styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
    registerForm: RegisterForm = {};

    onSubmit(f: NgForm) {
        console.log(this.registerForm);
        if (f.invalid) {
            f.form.markAllAsTouched();
            return;
        }

        // handle submit
    }
}
