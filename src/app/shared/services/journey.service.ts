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
import { FilterQueryForm } from '../models/filter-query-form.model';
import { AuthService } from './auth.service';

@Injectable()
export class JourneyService {
    private filterQueryForm: FilterQueryForm = {};

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    getJourneys(params?: { [key: string]: string | number }): Observable<any> {
        const user = this.authService.getUser();
        return this.http
            .get<any>(`${API}/Journey`, {
                params,
                headers: { Authorization: 'Bearer ' + user?.token },
            })
            .pipe(
                map((rawData) => ({
                    total: rawData.total,
                    data: rawData.data.map((journey: any) => ({
                        ...journey,
                        imageUrl: journey.imageUrl ? `${SERVER}/${journey.imageUrl}` : null,
                        image: journey.image ? `data:image/png;base64,${journey.image}` : null,
                    })),
                }))
            );
    }

    getJourney(id: number): Observable<Journey> {
        const user = this.authService.getUser();
        return this.http.get<any>(`${API}/Journey/${id}`, {
            headers: { Authorization: 'Bearer ' + user?.token },
        });
    }

    createJourney(body: CreateJourneyForm): Observable<Journey> {
        const user = this.authService.getUser();
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
            ),
            { headers: { Authorization: 'Bearer ' + user?.token } }
        );
    }

    updateJourney(id: number, body: EditJourneyForm): Observable<Journey> {
        const user = this.authService.getUser();
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
            ),
            { headers: { Authorization: 'Bearer ' + user?.token } }
        );
    }

    deleteJourney(id: number): Observable<any> {
        const user = this.authService.getUser();
        return this.http.delete<{ id: number }>(`${API}/Journey/${id}`, {
            headers: { Authorization: 'Bearer ' + user?.token },
        });
    }

    deleteJourneys(ids: number[]): Observable<any> {
        const user = this.authService.getUser();
        return this.http.delete<{ id: number }>(`${API}/Journey/many`, {
            body: ids,
            headers: { Authorization: 'Bearer ' + user?.token },
        });
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

    getFilterQueryForm() {
        return structuredClone(this.filterQueryForm) as FilterQueryForm;
    }

    setFilterQueryForm(filterQueryForm: FilterQueryForm) {
        this.filterQueryForm = structuredClone(filterQueryForm) as FilterQueryForm;
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
