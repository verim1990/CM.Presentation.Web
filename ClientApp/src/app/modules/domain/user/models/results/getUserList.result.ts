import { ApiPaginatedResult } from "../../../../feature/shared/models/api/results/api-paginated-result.model";
import { User } from "../user.model";

export interface GetUserListResult extends ApiPaginatedResult<User> {
}
