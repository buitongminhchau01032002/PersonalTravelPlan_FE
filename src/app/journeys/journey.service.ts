import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Journey } from '../shared/models/journey.model';
import { API } from '../constants';

@Injectable()
export class JourneyService {
    constructor(private http: HttpClient) {}

    getJourneys(params?: { [key: string]: string | number }): Observable<Journey[]> {
        return this.http.get<any>(`${API}/Journey`, {
            params,
        });
    }

    private cloneJourneys(journeys: Journey[]): Journey[] {
        return structuredClone(journeys) as Journey[];
    }
}
