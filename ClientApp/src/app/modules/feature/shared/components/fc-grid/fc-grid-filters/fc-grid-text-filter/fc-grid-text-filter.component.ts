import { Component, OnInit, Input, HostBinding } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { distinctUntilChanged, skip, debounceTime, map, startWith } from "rxjs/operators";

// Models
import { FcGridFilterModel, FcGridFilterType } from "./../fc-grid-filter.model";

@Component({
    selector: "fc-grid-text-filter",
    templateUrl: "./fc-grid-text-filter.component.html",
    styleUrls: ["./fc-grid-text-filter.component.scss"]
})
export class FcGridTextFilterComponent implements OnInit {
    @Input() type: FcGridFilterType = FcGridFilterType.Contains;
    @Input() name: string;
    @Input() title: string;

    changeFilter: Observable<FcGridFilterModel>;
    inputControl = new FormControl();

    ngOnInit() {
        this.changeFilter = this.inputControl.valueChanges
          .pipe(
            skip(1),
            distinctUntilChanged(),
            debounceTime(1000),
            map((value: string) => new FcGridFilterModel(this.type, this.name, value)),
            startWith(new FcGridFilterModel(this.type, this.name))
          );
    }
}
