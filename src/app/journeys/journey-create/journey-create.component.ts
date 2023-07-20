import { Component } from '@angular/core';

type Place = {
    name: string;
    id: number;
};
@Component({
    selector: 'app-journey-create',
    templateUrl: './journey-create.component.html',
    styleUrls: ['./journey-create.component.css'],
})
export class JourneyCreateComponent {
    places: Place[] = [
        { name: 'Ha Noi', id: 1 },
        { name: 'Ho Chi Minh City', id: 2 },
        { name: 'Da Nang', id: 3 },
    ];
    selectedPlaces: Place[] = [];
    date?: Date;
}
