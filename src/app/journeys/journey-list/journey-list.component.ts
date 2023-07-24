import { Component, OnInit } from '@angular/core';
import { JourneyService } from '../../shared/services/journey.service';
import { Journey, JourneyStaus } from 'src/app/shared/models/journey.model';
import { PaginatorState } from 'primeng/paginator';
import { Currency } from 'src/app/shared/models/currency.model';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { Country } from 'src/app/shared/models/country.model';
import { CountryService } from 'src/app/shared/services/country.service';
import { TableRowSelectEvent } from 'primeng/table';

type FilterQuery = {
    search?: string;
    status?: JourneyStaus;
    countryId?: number;
    currencyId?: number;
    amountFrom?: number;
    amountTo?: number;
    startDateFrom?: Date;
    startDateTo?: Date;
    endDateFrom?: Date;
    endDateTo?: Date;
};

@Component({
    selector: 'app-journey-list',
    templateUrl: './journey-list.component.html',
    styleUrls: ['./journey-list.component.css'],
})
export class JourneyListComponent implements OnInit {
    journeys: Journey[] = [];
    selectedJourneys: Journey[] = [];
    currencies: Currency[] = [];
    countries: Country[] = [];
    allStatus: JourneyStaus[] = ['Planning', 'In progress', 'Finished'];
    page: number = 1;
    totalRecords: number = 0;
    filterQueryForm: FilterQuery = {};
    filterQuery: { [key: string]: string | number | boolean } = {};
    loading: boolean = false;
    idToDelete: number | null = null;

    constructor(
        private journeySevice: JourneyService,
        private currencyService: CurrencyService,
        private countryService: CountryService
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.journeySevice.getJourneys().subscribe((body: any) => {
            this.journeys = body?.data;
            this.totalRecords = body?.total;
            this.loading = false;
        });
        this.currencyService.getCurrencies().subscribe((body: Currency[]) => {
            this.currencies = body;
        });
        this.countryService.getCountries().subscribe((body: Country[]) => {
            this.countries = body;
        });
    }

    onPageChange(event: PaginatorState) {
        this.page = event.page ? event.page + 1 : 1;
        this.loading = true;
        this.journeySevice
            .getJourneys({
                page: this.page,
                ...this.filterQuery,
            })
            .subscribe((body: any) => {
                this.journeys = body?.data;
                this.totalRecords = body?.total;
                this.loading = false;
            });
    }

    onFilter() {
        this.filterQuery = this.getFilterQueryFromForm();
        this.loading = true;
        this.page = 1;
        this.journeySevice
            .getJourneys({
                page: this.page,
                ...this.filterQuery,
            })
            .subscribe((body: any) => {
                this.journeys = body?.data;
                this.totalRecords = body?.total;
                this.loading = false;
            });
    }

    onResetFilter() {
        this.filterQuery = {};
        this.filterQueryForm = {};
        this.loading = true;
        this.journeySevice
            .getJourneys({
                page: this.page,
                ...this.filterQuery,
            })
            .subscribe((body: any) => {
                this.journeys = body?.data;
                this.totalRecords = body?.total;
                this.loading = false;
            });
    }

    private getFilterQueryFromForm(): {
        [key: string]: string | number | boolean;
    } {
        const query: any = {};
        if (this.filterQueryForm.search) {
            query['search'] = this.filterQueryForm.search;
        }
        if (this.filterQueryForm.amountFrom && this.filterQueryForm.amountFrom !== null) {
            query['amountFrom'] = this.filterQueryForm.amountFrom;
        }
        if (this.filterQueryForm.amountTo && this.filterQueryForm.amountTo !== null) {
            query['amountTo'] = this.filterQueryForm.amountTo;
        }
        if (this.filterQueryForm.startDateFrom) {
            query['startDateFrom'] = this.filterQueryForm.startDateFrom
                .toISOString()
                .substring(0, 10);
        }
        if (this.filterQueryForm.startDateTo) {
            query['startDateTo'] = this.filterQueryForm.startDateTo.toISOString().substring(0, 10);
        }
        if (this.filterQueryForm.endDateFrom) {
            query['endDateFrom'] = this.filterQueryForm.endDateFrom.toISOString().substring(0, 10);
        }
        if (this.filterQueryForm.endDateTo) {
            query['endDateTo'] = this.filterQueryForm.endDateTo.toISOString().substring(0, 10);
        }
        if (this.filterQueryForm.status) {
            query['status'] = this.filterQueryForm.status;
        }
        if (this.filterQueryForm.currencyId) {
            query['currencyId'] = this.filterQueryForm.currencyId;
        }
        if (this.filterQueryForm.countryId) {
            query['countryId'] = this.filterQueryForm.countryId;
        }
        return query as { [key: string]: number | string | boolean };
    }

    onDeleteJourney(id: number) {
        this.idToDelete = id;
    }

    onCancelDeleteJourney() {
        this.idToDelete = null;
    }

    onConfirmDeleteJourney() {
        console.log('🔱 Delete Journey ', this.idToDelete);
        if (this.idToDelete) {
            this.journeySevice.deleteJourney(this.idToDelete ?? 0).subscribe((body: any) => {
                this.idToDelete = null;

                this.filterQuery = this.getFilterQueryFromForm();
                this.loading = true;
                this.journeySevice
                    .getJourneys({
                        page: this.page,
                        ...this.filterQuery,
                    })
                    .subscribe((body: any) => {
                        this.journeys = body?.data;
                        this.totalRecords = body?.total;
                        this.loading = false;
                    });
            });
        }
    }

    onJourneySelectChange(e: any) {
        console.log(this.selectedJourneys);
    }
}
