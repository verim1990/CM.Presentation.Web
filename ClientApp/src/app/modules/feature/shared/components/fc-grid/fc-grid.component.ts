import { Component, AfterViewInit, Input, TemplateRef, ViewChild, ContentChildren, QueryList, Output, EventEmitter } from "@angular/core";
import { Observable, empty, pipe, combineLatest, concat, merge } from "rxjs";
import { map, mergeMap, tap, catchError, share, pluck, exhaustMap, startWith } from "rxjs/operators";

// Models
import { FcGridFilterModel } from "./fc-grid-filters/fc-grid-filter.model";
import { ApiListRequest } from "../../models/api/requests/api-list-request.model";
import { ApiPaginatedResult } from "../../models/api/results/api-paginated-result.model";

// Components
import { FcGridTextFilterComponent } from "./fc-grid-filters/fc-grid-text-filter/fc-grid-text-filter.component";
import { FcGridPagerComponent } from "./fc-grid-pager/fc-grid-pager.component";

// Services
import { NotificationsService } from "../../services/notifications/notifications.service";

@Component({
    selector: "fc-grid",
    templateUrl: "./fc-grid.component.html",
    styleUrls: ["./fc-grid.component.scss"]
})
export class FcGridComponent<TItem> implements AfterViewInit {
    @ContentChildren(FcGridTextFilterComponent) filters: QueryList<FcGridTextFilterComponent>;
    @ViewChild(FcGridPagerComponent) pager: FcGridPagerComponent;

  @Input() itemTemplate: TemplateRef<any>;
  @Input() getData: (request: ApiListRequest) => Observable<ApiPaginatedResult<TItem>>; 

  loading = true;
  request = {
    page: 1,
    pageSize: 5
  } as ApiListRequest;

  items$: Observable<TItem[]>;
  total$: Observable<number>;
  hasNoItems$: Observable<boolean>;

  constructor(
      private readonly notificationsService: NotificationsService
  ) { }

  ngAfterViewInit() {
    const filterSource = combineLatest(this.filters.map(f => f.changeFilter))
      .pipe(
          map(filters => ({
            ...this.request,
            filters: filters
              .filter(filter => filter.value)
              .map(filter => filter.serialize())
              .join(",")
          }))
        );

        const pagerSource = this.pager.changeFilter
          .pipe(
            map(model => ({
              ...this.request,
              page: model.page,
              pageSize: model.pageSize
            }))
          );

    const source = merge(filterSource, pagerSource)
        .pipe(
            mergeMap((request: ApiListRequest) => {
              this.request = { ...request };
              this.loading = true;

              return this.getData(request);
            }),
            tap(() => this.loading = false),
            catchError((err: any) => {
              this.notificationsService.add("error", "error", err);
              this.loading = false;

              return empty();
            }),
            share()
          );

        this.total$ = source.pipe(map(response => response.total));
        this.items$ = source.pipe(map(response => response.items));
        this.hasNoItems$ = this.items$.pipe(map(items => items.length === 0));
    }
}
