import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { Country } from 'src/app/shared/models/country.model';
import { Currency } from 'src/app/shared/models/currency.model';
import {
    EditJourney,
    EditJourneyForm,
    Journey,
    JourneyStaus,
} from 'src/app/shared/models/journey.model';
import { Place } from 'src/app/shared/models/place.model';
import { CountryService } from 'src/app/shared/services/country.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { JourneyService } from 'src/app/shared/services/journey.service';

@Component({
    selector: 'app-journey-edit',
    templateUrl: './journey-edit.component.html',
    styleUrls: ['./journey-edit.component.css'],
})
export class JourneyEditComponent implements OnInit {
    places: Place[] = [];
    currencies: Currency[] = [];
    countries: Country[] = [];
    allStatus: JourneyStaus[] = ['Planning', 'In progress', 'Finished'];
    journeyForm: EditJourneyForm = { status: 'Planning' };
    id: number = 0;
    constructor(
        private journeyService: JourneyService,
        private currencyService: CurrencyService,
        private countrySevice: CountryService,
        private messageService: MessageService,
        private router: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
            this.journeyService.getJourney(this.id).subscribe((journey) => {
                this.journeyForm = this.transformToJourneyForm(journey);

                const places: Place[] | undefined = this.countries.find(
                    (c) => c.id === this.journeyForm.countryId
                )?.places;

                if (places) {
                    this.places = places;
                } else {
                    this.places = [];
                }
            });
        });

        this.currencyService.getCurrencies().subscribe((body) => {
            this.currencies = body;
        });

        this.countrySevice.getCountries().subscribe((body) => {
            this.countries = body;

            const places: Place[] | undefined = this.countries.find(
                (c) => c.id === this.journeyForm.countryId
            )?.places;

            if (places) {
                this.places = places;
            } else {
                this.places = [];
            }
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

    onChangeStartOrEndDateChange() {
        if (this.journeyForm.endDate && this.journeyForm.startDate) {
            const distance = Math.ceil(
                (this.journeyForm.endDate.getTime() - this.journeyForm.startDate.getTime()) /
                    (1000 * 60 * 60 * 24)
            );
            this.journeyForm.durationDay = distance + 1;
            this.journeyForm.durationNight = distance;
        }
    }

    onSubmit(f: NgForm) {
        if (f.invalid) {
            this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Please fill all required fields!',
            });
            f.form.markAllAsTouched();
            return;
        }

        this.journeyService.updateJourney(this.id, this.journeyForm).subscribe({
            next: (body) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Edit journey successfully!',
                });
                this.router.navigate(['/journey']);
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
                    this.router.navigate(['/error']);
                }
            },
        });
    }

    private transformToJourneyForm(journey: Journey): EditJourneyForm {
        return new EditJourneyForm(
            journey.name,
            journey.description,
            journey.country.id,
            journey.currency?.id,
            journey.amount,
            new Date(journey.startDate),
            journey.endDate ? new Date(journey.endDate) : undefined,
            journey.durationDay,
            journey.durationNight,
            journey.places?.map((place) => place.id),
            journey.status
        );
    }
}
