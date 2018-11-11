import { Validators, FormBuilder, FormGroup } from "@angular/forms";

export class User {
    id: string;
    username: string;
    email: string;
    password: string;
    addedDate: Date;
    modifiedDate: Date;
}

export class UserFormModel {
    username: string | null;
    email: string | null;

    static fromModel(model: User) {
        const formModel = new UserFormModel();
        formModel.username = model.username || null;
        formModel.email = model.email || null;

        return formModel;
    }

    static toModel(formModel: UserFormModel, source: User) {
        const model = source || new User();
        model.username = formModel.username as string;
        model.email = formModel.email as string;

        return model;
    }

    static getConfiguration(formBuilder: FormBuilder): FormGroup {
        const configuration = {
            config: {
                username: ["", [Validators.required, Validators.minLength(5)]],
                email: ["", [Validators.required, Validators.minLength(5)]],
            }
        };

        return formBuilder.group(configuration.config);
    }
}
