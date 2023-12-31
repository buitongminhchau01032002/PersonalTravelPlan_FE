import { Attribute, Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
    NG_VALIDATORS,
    Validator,
    AbstractControl,
    ValidationErrors,
    FormControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[appAfterDateValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: AfterDateValidatorDirective,
            multi: true,
        },
    ],
})
export class AfterDateValidatorDirective implements Validator {
    private subscription: Subscription | null = null;
    constructor(@Attribute('appAfterDateValidator') public beforeDateName: string) {}

    validate(c: AbstractControl): ValidationErrors | null {
        if (this.subscription) {
            this.subscription.unsubscribe();
            this.subscription = null;
        }

        // Get control
        const beforeDate: AbstractControl | null = c.root.get(this.beforeDateName);
        const thisDate: AbstractControl = c;

        // listen beforeDate change to revalidate thisDate
        if (beforeDate) {
            this.subscription = beforeDate.valueChanges.subscribe(() => {
                thisDate.updateValueAndValidity();
            });
        }

        // check null
        if (!beforeDate?.value || !thisDate.value) {
            return null;
        }

        // return validate result
        return thisDate.value <= beforeDate.value ? { afterDate: true } : null;
    }
}
