import { Component, Input } from "@angular/core";

// Models
import { User } from "./../../models/user.model";

@Component({
    selector: "app-user-summary",
    templateUrl: "./user-summary.component.html",
    styleUrls: ["./user-summary.component.scss"]
})
export class UserSummaryComponent {
    @Input() user: User;
}
