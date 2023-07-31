import { Component, OnDestroy, OnInit } from '@angular/core';
import { JourneyService } from '../../shared/services/journey.service';
import { Journey, JourneyStaus } from 'src/app/shared/models/journey.model';
import { PaginatorState } from 'primeng/paginator';
import { Currency } from 'src/app/shared/models/currency.model';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { Country } from 'src/app/shared/models/country.model';
import { CountryService } from 'src/app/shared/services/country.service';
import { FilterQueryForm } from 'src/app/shared/models/filter-query-form.model';

@Component({
    selector: 'app-journey-list',
    templateUrl: './journey-list.component.html',
    styleUrls: ['./journey-list.component.css'],
})
export class JourneyListComponent implements OnInit, OnDestroy {
    journeys: Journey[] = [];
    selectedJourneys: Journey[] = [];
    currencies: Currency[] = [];
    countries: Country[] = [];
    allStatus: JourneyStaus[] = ['Planning', 'In progress', 'Finished'];
    page: number = 1;
    totalRecords: number = 0;
    filterQueryForm: FilterQueryForm = {};
    filterQuery: { [key: string]: string | number | boolean } = {};
    loading: boolean = false;
    idToDeletes: number[] = [];
    isDisabledDeleteBtn: boolean = true;
    deleteBtnNumberLabel: string = '';

    constructor(
        private journeySevice: JourneyService,
        private currencyService: CurrencyService,
        private countryService: CountryService
    ) {}

    ngOnInit(): void {
        this.loading = true;
        this.filterQueryForm = this.journeySevice.getFilterQueryForm();
        this.filterQuery = this.getFilterQueryFromForm();
        this.fetchJouneys();
        this.currencyService.getCurrencies().subscribe((body: Currency[]) => {
            this.currencies = body;
        });
        this.countryService.getCountries().subscribe((body: Country[]) => {
            this.countries = body;
        });
    }

    ngOnDestroy(): void {
        this.journeySevice.setFilterQueryForm(this.filterQueryForm);
    }

    onPageChange(event: PaginatorState) {
        this.page = event.page ? event.page + 1 : 1;
        this.fetchJouneys();
    }

    onFilter() {
        this.filterQuery = this.getFilterQueryFromForm();
        this.loading = true;
        this.page = 1;
        this.selectedJourneys = [];
        this.fetchJouneys();
    }

    onResetFilter() {
        this.filterQuery = {};
        this.filterQueryForm = {};
        this.fetchJouneys();
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

    fetchJouneys() {
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

    onDeleteSingleJourney(id: number) {
        this.idToDeletes = [id];
    }

    onCancelDeleteJourney() {
        this.idToDeletes = [];
    }

    onConfirmDeleteJourney() {
        console.log('🔱 Delete Journey ', this.idToDeletes);
        if (this.idToDeletes.length > 0) {
            this.journeySevice.deleteJourneys(this.idToDeletes).subscribe((body: any) => {
                this.idToDeletes = [];
                this.fetchJouneys();
            });
        }
    }

    onJourneySelectChange() {
        if (this.selectedJourneys.length === 0) {
            this.isDisabledDeleteBtn = true;
            this.deleteBtnNumberLabel = '';
            return;
        }

        this.deleteBtnNumberLabel = '(' + this.selectedJourneys.length + ')';
        const notPlanningJourney: Journey | undefined = this.selectedJourneys.find(
            (journey) => journey.status !== 'Planning'
        );

        if (notPlanningJourney) {
            this.isDisabledDeleteBtn = true;
        } else {
            this.isDisabledDeleteBtn = false;
        }
    }

    onDeleteSelectedJourney() {
        // map to id
        const ids: number[] = this.selectedJourneys.map((journey) => journey.id);
        this.idToDeletes = ids;
        console.log('⛴️ Ids to delete: ', ids);
    }
}
