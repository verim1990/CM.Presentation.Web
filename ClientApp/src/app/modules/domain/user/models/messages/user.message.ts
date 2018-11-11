import { User } from "./../user.model";

export class UserUpdatedMessage {
    constructor(
        public user: User
    ) {}
}