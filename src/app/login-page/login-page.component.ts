import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { Location } from '@angular/common';

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

    private readonly canGoBack: boolean;
    constructor(
        private authService: AuthService,
        private router: Router,
        private location: Location
    ) {
        this.canGoBack = !!this.router.getCurrentNavigation()?.previousNavigation;
    }

    onSubmit(f: NgForm) {
        console.log(this.loginForm);
        if (f.invalid) {
            f.form.markAllAsTouched();
            return;
        }

        this.authService.login(this.loginForm.username, this.loginForm.password).subscribe({
            next: (body: User) => {
                this.authService.setUser(body);
                if (this.canGoBack) {
                    this.location.back();
                } else {
                    this.router.navigate(['/']);
                }
            },
            error: (err) => {
                console.log(err);
                if (err.status !== 0) {
                    // TODO: message
                    console.log('🍍 Login failed!');
                } else {
                    console.log('🍉 Network error');
                    this.router.navigate(['/error']);
                }
            },
        });
    }
}
