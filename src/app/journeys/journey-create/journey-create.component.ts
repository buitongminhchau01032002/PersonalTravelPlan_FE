import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { Country } from 'src/app/shared/models/country.model';
import { Currency } from 'src/app/shared/models/currency.model';
import {
    CreateJourney,
    CreateJourneyForm,
    JourneyStaus,
} from 'src/app/shared/models/journey.model';
import { Place } from 'src/app/shared/models/place.model';
import { CountryService } from 'src/app/shared/services/country.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { JourneyService } from 'src/app/shared/services/journey.service';

@Component({
    selector: 'app-journey-create',
    templateUrl: './journey-create.component.html',
    styleUrls: ['./journey-create.component.css'],
})
export class JourneyCreateComponent implements OnInit {
    places: Place[] = [];
    currencies: Currency[] = [];
    countries: Country[] = [];
    allStatus: JourneyStaus[] = ['Planning', 'In progress', 'Finished'];
    journeyForm: CreateJourneyForm = { status: 'Planning' };
    constructor(
        private journeyService: JourneyService,
        private currencyService: CurrencyService,
        private countrySevice: CountryService,
        private messageService: MessageService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.currencyService.getCurrencies().subscribe((body) => {
            this.currencies = body;
        });
        this.countrySevice.getCountries().subscribe((body) => {
            this.countries = body;
        });
    }

    onChangeCountry(event: DropdownChangeEvent) {
        const countryId: number = event.value;
        const places: Place[] | undefined = this.countries.find((c) => c.id === countryId)?.places;
        if (places) {
            this.places = places;
        } else {
            this.places = [];
        }
        this.journeyForm.placeIds = [];
    }

    onSubmit(f: NgForm) {
        console.log(f);

        if (f.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please fill all required fields!',
            });
            f.form.markAllAsTouched();
            return;
        }

        this.journeyService.createJourney(this.journeyForm).subscribe({
            next: (body) => {
                console.log(body);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Create journey successfully!',
                });
            },
            error: (err) => {
                console.log(err);
                if (err.status !== 0) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Please fill all required fields!',
                    });
                } else {
                    console.log('🍉 Network error');
                    // todo: create error page
                    this.router.navigate(['/']);
                }
            },
        });
    }
}
