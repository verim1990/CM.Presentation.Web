import { Component, Input, EventEmitter, Output, OnInit } from "@angular/core"
import { Location } from "@angular/common"
import { Subject, BehaviorSubject, Observable } from "rxjs";

// Lodash
import * as _ from "lodash"

// Models
import { FcGridPagerModel } from "./fc-grid-pager.model";

@Component({
    selector: "fc-grid-pager",
    templateUrl: "./fc-grid-pager.component.html",
    styleUrls: ["./fc-grid-pager.component.scss"]
})
export class FcGridPagerComponent implements OnInit {
    @Input() total: number = 0;
    @Input() page: number = 1;
    @Input() rangeSize: number = 3;
    @Input() pageSize: number = 10;
    @Input() pageSizes: number[] = [5, 10, 20, 50, 100];

    changeFilter: Observable<FcGridPagerModel>;

    private changeFilterSubject = new Subject<FcGridPagerModel>();

    ngOnInit() {
      this.changeFilter = this.changeFilterSubject.asObservable();
    }

    totalPages() {
        return Math.ceil(this.total / this.pageSize);
    }

    pagesRange() {
        const totalPages = this.totalPages();
        const rangeMiddle = Math.ceil(this.rangeSize / 2);
        let startPage: number,
            endPage: number;

        if (totalPages <= this.rangeSize) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (this.page <= rangeMiddle) {
                startPage = 1;
                endPage = this.rangeSize;
            } else if (this.page + rangeMiddle - 1 >= totalPages) {
                startPage = totalPages - this.rangeSize + 1;
                endPage = totalPages;
            } else {
                startPage = this.page - rangeMiddle + 1;
                endPage = startPage + this.rangeSize - 1;
            }
        }

        return _.range(startPage, endPage + 1);
    }

    prevPage() {
        if (this.page - 1 < 1) {
            return this.page;
        } else {
            return this.page - 1;
        }
    }

    nextPage() {
        if (this.page + 1 > this.totalPages()) {
            return this.page;
        } else {
            return this.page + 1;
        }
    }

    pageClicked(page: number) {
        if (page === this.page) {
            return;
        }

        this.changeFilterSubject.next({
          page,
          pageSize: this.pageSize
        });
    }

    pageSizeChanged(pageSize: number) {
      if (pageSize === this.pageSize) {
        return;
      }

      this.changeFilterSubject.next({
        page: 1,
        pageSize
      });
    }
}
