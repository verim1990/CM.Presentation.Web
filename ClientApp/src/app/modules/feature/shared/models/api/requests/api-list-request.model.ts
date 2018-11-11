export class ApiListRequest {
  constructor(
    public sorts: string = '',
    public filters: string = '',
    public page: number = 1,
    public pageSize: number = 10
  ) { }
}
