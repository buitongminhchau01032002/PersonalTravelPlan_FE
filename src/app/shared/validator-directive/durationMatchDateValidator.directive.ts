import { Attribute, Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[durationMatchDateValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: DurationMatchDateValidator,
            multi: true,
        },
    ],
})
export class DurationMatchDateValidator implements Validator {
    constructor(
        @Attribute('startDateName') public startDateName: string,
        @Attribute('endDateName') public endDateName: string
    ) {}

    validate(c: AbstractControl): ValidationErrors | null {
        // get control
        const duration: AbstractControl = c;
        const startDate: AbstractControl | null = c.root.get(this.startDateName);
        const endDate: AbstractControl | null = c.root.get(this.endDateName);

        // listen other change to revalidate
        if (startDate) {
            const subscription: Subscription = startDate.valueChanges.subscribe(() => {
                duration.updateValueAndValidity();
                subscription.unsubscribe();
            });
        }
        if (endDate) {
            const subscription: Subscription = endDate.valueChanges.subscribe(() => {
                duration.updateValueAndValidity();
                subscription.unsubscribe();
            });
        }

        if (!duration.value || !endDate?.value || !startDate?.value) {
            return null;
        }

        if (endDate.value <= startDate.value) {
            return null;
        }

        console.log(endDate.value - startDate.value);

        const distanceDate = Math.ceil((endDate.value - startDate.value) / (1000 * 60 * 60 * 24));

        return duration.value > distanceDate + 1 ? { matchDate: true } : null;
    }
}
