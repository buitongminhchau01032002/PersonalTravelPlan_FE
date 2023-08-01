import { Country } from './country.model';
import { Currency } from './currency.model';
import { Place } from './place.model';

export type JourneyStaus = 'In progress' | 'Planning' | 'Finished';

export class Journey {
    public durationDay?: number;
    public durationNight?: number;
    public places?: Place[];
    public imageUrl?: string;
    public image?: string;
    constructor(
        public id: number,
        public name: string,
        public description: string,
        public country: Country,
        public currency: Currency,
        public amount: number,
        public startDate: string,
        public endDate: string,
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

export class EditJourney {
    constructor(
        public name?: string,
        public description?: string,
        public countryId?: number,
        public currencyId?: number,
        public amount?: number,
        public startDate?: string,
        public endDate?: string,
        public durationDay?: number,
        public durationNight?: number,
        public placeIds?: number[],
        public status?: JourneyStaus,
        public imageUrl?: string,
        public image?: string
    ) {
        this.name = name;
        this.description = description;
        this.countryId = countryId;
        this.currencyId = currencyId;
        this.amount = amount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.durationDay = durationDay;
        this.durationNight = durationNight;
        this.placeIds = placeIds;
        this.status = status;
        this.imageUrl = imageUrl;
        this.image = image;
    }
}

export type CreateJourneyForm = {
    imageUrl?: string;
    name?: string;
    description?: string;
    countryId?: number;
    currencyId?: number;
    amount?: number;
    startDate?: Date;
    endDate?: Date;
    durationDay?: number;
    durationNight?: number;
    placeIds?: number[];
    status?: JourneyStaus;
    image?: string;
};

export class CreateJourney {
    constructor(
        public name?: string,
        public description?: string,
        public countryId?: number,
        public currencyId?: number,
        public amount?: number,
        public startDate?: string,
        public endDate?: string,
        public durationDay?: number,
        public durationNight?: number,
        public placeIds?: number[],
        public status?: JourneyStaus,
        public imageUrl?: string,
        public image?: string
    ) {
        this.name = name;
        this.description = description;
        this.countryId = countryId;
        this.currencyId = currencyId;
        this.amount = amount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.durationDay = durationDay;
        this.durationNight = durationNight;
        this.placeIds = placeIds;
        this.status = status;
        this.imageUrl = imageUrl;
        this.image = image;
    }
}

export class EditJourneyForm {
    constructor(
        public name?: string,
        public description?: string,
        public countryId?: number,
        public currencyId?: number,
        public amount?: number,
        public startDate?: Date,
        public endDate?: Date,
        public durationDay?: number,
        public durationNight?: number,
        public placeIds?: number[],
        public status?: JourneyStaus,
        public imageUrl?: string,
        public image?: string
    ) {
        this.name = name;
        this.description = description;
        this.countryId = countryId;
        this.currencyId = currencyId;
        this.amount = amount;
        this.startDate = startDate;
        this.endDate = endDate;
        this.durationDay = durationDay;
        this.durationNight = durationNight;
        this.placeIds = placeIds;
        this.status = status;
        this.imageUrl = imageUrl;
        this.image = image;
    }
}
