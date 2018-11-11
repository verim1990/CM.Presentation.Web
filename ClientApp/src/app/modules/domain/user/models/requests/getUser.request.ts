import { ApiRequest } from "../../../../feature/shared/models/api/requests/api-request.model";

export class GetUserRequest extends ApiRequest {
  constructor(
    public id: string
  ) {
        super();
    }
}
