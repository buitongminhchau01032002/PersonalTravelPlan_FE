import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
    CreateJourney,
    CreateJourneyForm,
    EditJourney,
    EditJourneyForm,
    Journey,
} from '../models/journey.model';
import { API, SERVER } from '../../constants';

@Injectable()
export class JourneyService {
    constructor(private http: HttpClient) {}

    getJourneys(params?: { [key: string]: string | number }): Observable<any> {
        return this.http
            .get<any>(`${API}/Journey`, {
                params,
            })
            .pipe(
                map((rawData) => ({
                    total: rawData.total,
                    data: rawData.data.map((journey: any) => ({
                        ...journey,
                        imageUrl: journey.imageUrl ? `${SERVER}/${journey.imageUrl}` : null,
                    })),
                }))
            );
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
                body.status,
                body.imageUrl
            )
        );
    }

    updateJourney(id: number, body: EditJourneyForm): Observable<Journey> {
        return this.http.put<Journey>(
            `${API}/Journey/${id}`,
            new EditJourney(
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
                body.status,
                body.imageUrl
            )
        );
    }

    deleteJourney(id: number): Observable<any> {
        return this.http.delete<{ id: number }>(`${API}/Journey/${id}`);
    }

    deleteJourneys(ids: number[]): Observable<any> {
        return this.http.delete<{ id: number }>(`${API}/Journey/many`, { body: ids });
    }

    uploadImage(file?: File): Observable<{ path?: string }> {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            return this.http.post<{ path: string }>(`${API}/Upload`, formData);
        } else {
            return new Observable((observer) => observer.next({ path: undefined }));
        }
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
