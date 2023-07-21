import { Place } from './place.model';

export class Country {
    constructor(
        public id: number,
        public name: string,
        public code: string,
        public places?: Place[]
    ) {
        this.id = id;
        this.name = name;
        this.code = code;
        this.places = places;
    }
}
