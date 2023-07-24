import { Attribute, Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[durationNightValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: DurationNightValidator,
            multi: true,
        },
    ],
})
export class DurationNightValidator implements Validator {
    constructor(
        @Attribute('startDateName') public startDateName: string,
        @Attribute('endDateName') public endDateName: string
    ) {}

    validate(c: AbstractControl): ValidationErrors | null {
        return null;
    }
}
