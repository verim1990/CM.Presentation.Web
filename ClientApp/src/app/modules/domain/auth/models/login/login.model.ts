import { Validators } from "@angular/forms";

export class Login {
    username: string;
    password: string;
}

export class LoginFormModel {
    username: string;
    password: string;

    static fromModel(model: Login) {
        const formModel = new LoginFormModel();

        formModel.username = model.username;
        formModel.password = model.password;

        return formModel;
    }

    static toModel(formModel: LoginFormModel, source: Login) {
        const model = source || new Login();

        model.username = formModel.username;
        model.password = formModel.password;

        return model;
    }

    static getConfiguration() {
        return {
            config: {
                username: ["", [Validators.required as any]],
                password: ["", [Validators.required as any]],
            }
        };
    }
}
