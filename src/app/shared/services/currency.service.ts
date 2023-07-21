import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Currency } from '../models/currency.model';
import { API } from '../../constants';

@Injectable()
export class CurrencyService {
    constructor(private http: HttpClient) {}

    getCurrencies(): Observable<Currency[]> {
        return this.http.get<any>(`${API}/Currency`);
    }

    private cloneCurrencies(currencies: Currency[]): Currency[] {
        return structuredClone(currencies) as Currency[];
    }
}
