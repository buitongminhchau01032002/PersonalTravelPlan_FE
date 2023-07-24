import { Attribute, Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[durationValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: DurationValidator,
            multi: true,
        },
    ],
})
export class DurationValidator implements Validator {
    private subscription: Subscription | null = null;
    constructor(@Attribute('durationValidator') public otherDurationName: string) {}

    validate(c: AbstractControl): ValidationErrors | null {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }
        // get control
        const thisDuration: AbstractControl = c;
        const otherDuration: AbstractControl | null = c.root.get(this.otherDurationName);

        // listen other change to revalidate
        if (otherDuration) {
            this.subscription = otherDuration.valueChanges.subscribe(() => {
                thisDuration.updateValueAndValidity();
            });
        }

        if (!thisDuration.value || !otherDuration?.value) {
            return null;
        }

        if (thisDuration.value <= 0 || otherDuration?.value <= 0) {
            return null;
        }

        return Math.abs(thisDuration.value - otherDuration.value) > 1
            ? { durationDistance: true }
            : null;
    }
}
