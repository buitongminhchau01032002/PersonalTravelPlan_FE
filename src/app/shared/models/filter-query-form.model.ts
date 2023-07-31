import { JourneyStaus } from './journey.model';

export type FilterQueryForm = {
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
