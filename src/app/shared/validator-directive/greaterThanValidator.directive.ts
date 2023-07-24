import { Attribute, Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[greaterThanValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: GreaterThanValidator,
            multi: true,
        },
    ],
})
export class GreaterThanValidator implements Validator {
    @Input('greaterThanValidator') num: number = 0;

    validate(c: AbstractControl): ValidationErrors | null {
        // get control
        const thisDuration: AbstractControl = c;

        if (thisDuration.value == null) {
            return null;
        }

        return thisDuration.value <= this.num ? { greaterThan: true } : null;
    }
}
