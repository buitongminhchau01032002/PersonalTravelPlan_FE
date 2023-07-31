import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Message, MessageService } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { Subscription } from 'rxjs';
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
export class JourneyCreateComponent implements OnInit, OnDestroy {
    places: Place[] = [];
    currencies: Currency[] = [];
    countries: Country[] = [];
    allStatus: JourneyStaus[] = ['Planning', 'In progress', 'Finished'];
    journeyForm: CreateJourneyForm = { status: 'Planning' };
    unsubTranslate?: Subscription;
    imageUpload?: File;
    imagePreviewUrl?: string;
    ERROR_MESSAGE: Message = {
        severity: 'error',
        summary: '',
        detail: '',
    };
    SUCCESS_MESSAGE: Message = {
        severity: 'success',
        summary: '',
        detail: '',
    };
    constructor(
        private journeyService: JourneyService,
        private currencyService: CurrencyService,
        private countrySevice: CountryService,
        private messageService: MessageService,
        private router: Router,
        private translate: TranslateService
    ) {}

    ngOnInit(): void {
        this.currencyService.getCurrencies().subscribe((body) => {
            this.currencies = body;
        });
        this.countrySevice.getCountries().subscribe((body) => {
            this.countries = body;
        });

        // Get translate
        this.unsubTranslate = this.translate.stream('Mess').subscribe((messObj) => {
            this.ERROR_MESSAGE.summary = messObj['Error'];
            this.SUCCESS_MESSAGE.summary = messObj['Success'];
            this.ERROR_MESSAGE.detail = messObj['PleaseFill'];
            this.SUCCESS_MESSAGE.detail = messObj['CreateJourneySuccess'];
        });
    }

    ngOnDestroy(): void {
        this.unsubTranslate?.unsubscribe();
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

    onSelectImage(event: Event) {
        this.imageUpload = (event.target as HTMLInputElement)?.files?.[0];

        if (this.imageUpload) {
            this.imagePreviewUrl = URL.createObjectURL(this.imageUpload);
        }
    }

    onRemoveImage() {
        this.imagePreviewUrl = undefined;
        this.imageUpload = undefined;
    }

    onSubmit(f: NgForm) {
        if (f.invalid) {
            this.messageService.add(this.ERROR_MESSAGE);
            f.form.markAllAsTouched();
            return;
        }

        this.journeyService.uploadImage(this.imageUpload).subscribe((fileRes) => {
            const path = fileRes.path;
            this.journeyForm.imageUrl = path;
            console.log(this.journeyForm);
            this.journeyService.createJourney(this.journeyForm).subscribe({
                next: (body) => {
                    this.messageService.add(this.SUCCESS_MESSAGE);
                    this.router.navigate(['/journey']);
                },
                error: (err) => {
                    console.log(err);
                    if (err.status !== 0) {
                        this.messageService.add(this.ERROR_MESSAGE);
                    } else {
                        console.log('🍉 Network error');
                        this.router.navigate(['/error']);
                    }
                },
            });
        });
    }
}
