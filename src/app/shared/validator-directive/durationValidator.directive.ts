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
    constructor(@Attribute('durationValidator') public otherDurationName: string) {}

    validate(c: AbstractControl): ValidationErrors | null {
        // get control
        const thisDuration: AbstractControl = c;
        const otherDuration: AbstractControl | null = c.root.get(this.otherDurationName);
        console.log('validate');

        // listen other change to revalidate
        if (otherDuration) {
            console.log('subscribe');
            const subscription: Subscription = otherDuration.valueChanges.subscribe(() => {
                thisDuration.updateValueAndValidity();
                subscription.unsubscribe();
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
