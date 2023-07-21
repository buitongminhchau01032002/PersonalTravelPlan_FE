import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[appAfterDateValidator]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useClass: AfterDateValidatorDirective,
            multi: true,
        },
    ],
})
export class AfterDateValidatorDirective implements Validator, OnChanges {
    @Input() afterDate?: Date;

    validate(c: AbstractControl): ValidationErrors | null {
        if (c.value && this.afterDate && c.value <= this.afterDate) {
            return {
                afterDate: true,
            };
        }
        return null;
    }
    onChange: (() => void) | undefined;
    registerOnValidatorChange(fn: () => void): void {
        this.onChange = fn;
    }
    ngOnChanges(changes: SimpleChanges): void {
        if ('afterDate' in changes && this.onChange) {
            this.onChange();
        }
    }
}
