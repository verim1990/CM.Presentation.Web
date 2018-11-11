import { FormGroup } from '@angular/forms';

export let CrossValidatorBuilder = (validators: any[]) => {
    return (group: FormGroup): { [key: string]: any } | undefined => {
        const result = <any>{};
        let valid = true;

        validators.forEach(validator => {
            const error = validator(group);

            if (error != null) {
                result[error] = true;
                valid = false;
            }
        });

        return !valid ? result : null;
    };
};

export let IsDiffrentCrossValidatorFn =
    (key1: string, key2: string, checkKey: string, errorName: string): (group: FormGroup) => string | null => {
        return (group: FormGroup): string | null => {
            const item1 = group.controls[key1];
            const item2 = group.controls[key2];

            if (item1.value && item2.value && item1.value[checkKey] === item2.value[checkKey]) {
                return errorName;
            }

            return null;
        };
    };

export let IsLaterDateCrossValidatorFn = (key1: string, key2: string, errorName: string): (group: FormGroup) => string | null => {
    return (group: FormGroup): string | null => {
        const item1 = group.controls[key1];
        const item2 = group.controls[key2];

        if (+item1.value < +item2.value) {
            return errorName;
        }

        return null;
    };
};

export let IsRaisingLengthCrossValidator = (key1: string, key2: string, errorName: string): (group: FormGroup) => string | null => {
    return (group: FormGroup): string | null => {
        const item1 = group.controls[key1];
        const item2 = group.controls[key2];

        if (+item1.value > +item2.value) {
            return errorName;
        }

        return null;
    };
};

export let IsPasswordMatchingCrossValidator = (key1: string, key2: string, errorName: string): (group: FormGroup) => string | null => {
    return (group: FormGroup): string | null => {
        const item1 = group.controls[key1];
        const item2 = group.controls[key2];

        if (+item1.value > +item2.value) {
            return errorName;
        }

        if (item1.value !== item2.value) {
            return errorName;
        }

        return null;
    };
};
