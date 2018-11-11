import { FormControl } from "@angular/forms";

// Models
import { DateRange } from "../models/common/date-range.model";
import { NumberRange } from "../models/common/number-range.model";

export let NumberValidator = (params: any = {}) => {
    return (control: FormControl): { [key: string]: any } | null => {
        const val: number = control.value;

        if (val == null || (val as any).length === 0) {
            return null;
        }

        if (isNaN(val) || /\D/.test(val.toString())) {
            return { 'invalid': true };
        } else if (!isNaN(params.min) && val < params.min) {
            return { 'min': true };
        } else if (!isNaN(params.max) && val > params.max) {
            return { 'max': true };
        } else {
            return null;
        }
    };
};

export let MinArrayLength = (min: number) => {
    return (control: FormControl): { [key: string]: any } | null => {
        if (control.value.length >= min) {
            return null;
        }

        return {
            minArrayLength: true
        };
    }
}

export let DateRangeValidator = () => {
    return (control: FormControl): { [key: string]: boolean } | null => {
        const range: DateRange = control.value;

        if (range == null || (range as any).length === 0) {
            return null;
        }

        if (range.from == null || range.to == null) {
            return {
                required: true
            };
        }

        if (range.from > range.to) {
            return {
                invalidDateRange: true
            };
        }

        return null;
    };
}

export let NumberRangeValidator = (params: any = {}) => {
    return (control: FormControl): { [key: string]: boolean } | undefined | null => {
        const range: NumberRange = control.value;

        if (range == null) {
            return null;
        }

        // From
        if (!range.from) {
            return { requiredFrom: true }
        } else if (isNaN(range.from)) {
            return { invalidFrom: true }
        } else if (!isNaN(params.min) && range.from < params.min) {
            return { min: true }
        }

        // To
        if (!range.to) {
            return { requiredTo: true }
        } else if (isNaN(range.to)) {
            return { invalidTo: true }
        } else if (!isNaN(params.max) && range.to > params.max) {
            return { max: true }
        }

        // Cross
        if (range.from > range.to) {
            return { invalidNumberRange: true };
        }
    };
};
