import { Component, OnInit } from '@angular/core';
import { Country } from 'src/app/shared/models/country.model';
import { Currency } from 'src/app/shared/models/currency.model';
import { CreateJourney, JourneyStaus } from 'src/app/shared/models/journey.model';
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
    journeyForm: CreateJourney = {};
    constructor(
        private journeyService: JourneyService,
        private currencyService: CurrencyService,
        private countrySevice: CountryService
    ) {}

    ngOnInit(): void {
        this.currencyService.getCurrencies().subscribe((body) => {
            this.currencies = body;
        });
        this.countrySevice.getCountries().subscribe((body) => {
            this.countries = body;
        });
    }

    onCreateJourney() {
        // todo: submit
        console.log(JSON.stringify(this.journeyForm, null, 4));
        this.journeyService.createJourney(this.journeyForm).subscribe((body) => {
            console.log(body);
        });
    }
}
