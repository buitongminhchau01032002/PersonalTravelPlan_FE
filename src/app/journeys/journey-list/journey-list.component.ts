import { Component, OnInit } from '@angular/core';
import { JourneyService } from '../journey.service';
import { Journey } from 'src/app/shared/models/journey.model';
import { PaginatorState } from 'primeng/paginator';

@Component({
    selector: 'app-journey-list',
    templateUrl: './journey-list.component.html',
    styleUrls: ['./journey-list.component.css'],
})
export class JourneyListComponent implements OnInit {
    journeys: Journey[] = [];
    selectedJourneys: Journey[] = [];
    first: number = 0;
    totalRecords: number = 0;
    constructor(private journeySevice: JourneyService) {}

    ngOnInit(): void {
        this.journeySevice.getJourneys().subscribe((body: any) => {
            this.journeys = body?.data;
            this.totalRecords = body?.total;
        });
    }
    onPageChange(event: PaginatorState) {
        this.first = event.first ?? 0;
        this.journeySevice
            .getJourneys({
                page: event.page ? event.page + 1 : 1,
            })
            .subscribe((body: any) => {
                this.journeys = body?.data;
                this.totalRecords = body?.total;
            });
    }
}
