import { ApiResult } from "../../../../feature/shared/models/api/results/api-result.model";
import { User } from "../user.model";

export interface GetUserResult extends ApiResult {
  user: User;
}
