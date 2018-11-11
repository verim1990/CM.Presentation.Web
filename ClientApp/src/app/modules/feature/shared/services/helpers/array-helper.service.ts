import { Injectable } from '@angular/core';

@Injectable()
export class ArrayHelperService {
    removeDuplicates(myArr: any[], prop: string) {
        return myArr.filter((obj, pos, arr) => {
            return arr.map((mapObj: any) => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    }
}
