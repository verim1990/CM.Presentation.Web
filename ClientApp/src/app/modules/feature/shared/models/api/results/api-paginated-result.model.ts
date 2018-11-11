export interface ApiPaginatedResult<TItem> {
    items: Array<TItem>;
    total: number;
}
