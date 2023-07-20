import { Country } from './country.model';
import { Currency } from './currency.model';
import { Place } from './place.model';

export type JourneyStaus = 'In progress' | 'Planning' | 'Finished';

export class Journey {
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public country: Country,
        public currency: Currency,
        public amount: number,
        public startDate: Date,
        public endDate: Date,
        public places: Place[],
        public status: JourneyStaus
    ) {
        this.name = name;
        this.description = description;
        this.country = country;
        this.currency = currency;
        this.amount = amount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
    }
}
