export class Place {
    constructor(
        public id: number,
        public name: string,
        public countryId: number,
    ) {
        this.id = id;
        this.name = name;
        this.countryId = countryId;
    }
}
