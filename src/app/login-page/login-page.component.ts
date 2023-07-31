import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

type LoginForm = {
    username?: string;
    password?: string;
};

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
    loginForm: LoginForm = {};

    onSubmit(f: NgForm) {
        console.log(this.loginForm);
        if (f.invalid) {
            f.form.markAllAsTouched();
            return;
        }

        // handle submit
    }
}
