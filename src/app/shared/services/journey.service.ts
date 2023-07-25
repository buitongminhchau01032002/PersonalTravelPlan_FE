import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateJourney, CreateJourneyForm, Journey } from '../models/journey.model';
import { API } from '../../constants';

@Injectable()
export class JourneyService {
    constructor(private http: HttpClient) {}

    getJourneys(params?: { [key: string]: string | number }): Observable<Journey[]> {
        return this.http.get<any>(`${API}/Journey`, {
            params,
        });
    }

    getJourney(id: number): Observable<Journey> {
        return this.http.get<any>(`${API}/Journey/${id}`);
    }

    createJourney(body: CreateJourneyForm): Observable<Journey> {
        return this.http.post<Journey>(
            `${API}/Journey`,
            new CreateJourney(
                body.name,
                body.description,
                body.countryId,
                body.currencyId,
                body.amount,
                this.dateToString(body.startDate),
                this.dateToString(body.endDate),
                body.durationDay,
                body.durationNight,
                body.placeIds,
                body.status
            )
        );
    }

    updateJourney(id: number, body: CreateJourneyForm): Observable<Journey> {
        return this.http.put<Journey>(
            `${API}/Journey/${id}`,
            new CreateJourney(
                body.name,
                body.description,
                body.countryId,
                body.currencyId,
                body.amount,
                this.dateToString(body.startDate),
                this.dateToString(body.endDate),
                body.durationDay,
                body.durationNight,
                body.placeIds,
                body.status
            )
        );
    }

    deleteJourney(id: number): Observable<any> {
        return this.http.delete<{ id: number }>(`${API}/Journey/${id}`);
    }

    deleteJourneys(ids: number[]): Observable<any> {
        return this.http.delete<{ id: number }>(`${API}/Journey/many`, { body: ids });
    }

    private cloneJourneys(journeys: Journey[]): Journey[] {
        return structuredClone(journeys) as Journey[];
    }

    private dateToString(date?: Date): string | undefined {
        if (!date) {
            return undefined;
        }
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    }
}
