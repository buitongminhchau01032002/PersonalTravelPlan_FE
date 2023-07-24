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
    private startDateSubscription: Subscription | null = null;
    private endDateSubscription: Subscription | null = null;
    constructor(
        @Attribute('startDateName') public startDateName: string,
        @Attribute('endDateName') public endDateName: string
    ) {}

    validate(c: AbstractControl): ValidationErrors | null {
        if (this.startDateSubscription) {
            this.startDateSubscription.unsubscribe();
            this.startDateSubscription = null;
        }
        if (this.endDateSubscription) {
            this.endDateSubscription.unsubscribe();
            this.endDateSubscription = null;
        }

        // get control
        const duration: AbstractControl = c;
        const startDate: AbstractControl | null = c.root.get(this.startDateName);
        const endDate: AbstractControl | null = c.root.get(this.endDateName);

        console.log('validate');

        // listen other change to revalidate
        if (startDate) {
            this.startDateSubscription = startDate.valueChanges.subscribe(() => {
                duration.updateValueAndValidity();
            });
        }
        if (endDate) {
            this.endDateSubscription = endDate.valueChanges.subscribe(() => {
                duration.updateValueAndValidity();
            });
        }

        if (!duration.value || !endDate?.value || !startDate?.value) {
            return null;
        }

        if (endDate.value <= startDate.value) {
            return null;
        }

        const distanceDate = Math.ceil((endDate.value - startDate.value) / (1000 * 60 * 60 * 24));

        return duration.value > distanceDate + 1 ? { matchDate: true } : null;
    }
}
