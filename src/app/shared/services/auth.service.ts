import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { API } from 'src/app/constants';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
    private user?: User;

    constructor(private http: HttpClient) {}

    getUser() {
        return this.user;
    }

    setUser(user: User) {
        this.user = user;
    }

    login(username?: string, password?: string): Observable<User> {
        return this.http.post<User>(`${API}/Auth/login`, { username, password });
    }

    logout() {
        this.user = undefined;
    }
}
