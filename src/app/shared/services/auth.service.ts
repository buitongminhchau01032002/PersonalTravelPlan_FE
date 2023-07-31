import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
    private user?: User;

    getUser() {
        return this.user;
    }

    login(user: User) {
        this.user = user;
    }

    logout() {
        this.user = undefined;
    }
}
