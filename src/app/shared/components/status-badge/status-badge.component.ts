import { Component, Input } from '@angular/core';
import { JourneyStaus } from '../../models/journey.model';

@Component({
    selector: 'app-status-badge',
    templateUrl: './status-badge.component.html',
    styleUrls: ['./status-badge.component.css'],
})
export class StatusBadgeComponent {
    @Input() status: string = 'Planning';
}
