import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { API } from '../../constants';

@Injectable()
export class CountryService {
    constructor(private http: HttpClient) {}

    getCountries(): Observable<Country[]> {
        return this.http.get<any>(`${API}/Country`);
    }

    private cloneCountries(countrise: Country[]): Country[] {
        return structuredClone(countrise) as Country[];
    }
}
