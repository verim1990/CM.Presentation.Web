import { Validators } from "@angular/forms";

// Validators
import { CrossValidatorBuilder, IsPasswordMatchingCrossValidator } from "../../../../feature/shared/validators/common.cross.validators";

export class Register {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export class RegisterFormModel {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;

    static fromModel(model: Register) {
        const formModel = new RegisterFormModel();

        formModel.username = model.username;
        formModel.email = model.email;
        formModel.password = model.password;
        formModel.confirmPassword = model.confirmPassword;

        return formModel;
    }

    static toModel(formModel: RegisterFormModel, source: Register) {
        const model = source || new Register();

        model.username = formModel.username;
        model.email = formModel.email;
        model.password = formModel.password;
        model.confirmPassword = formModel.confirmPassword;

        return model;
    }

    static getConfiguration() {
        return {
            config: {
                username: ["", [Validators.required as any, Validators.minLength(5) as any]],
                email: ["", [Validators.required as any, Validators.minLength(5) as any]],
                password: ["", [Validators.required as any, Validators.minLength(5) as any]],
                confirmPassword: ["", [Validators.required as any, Validators.minLength(5) as any]]
            },
            extra: {
                validator: CrossValidatorBuilder([
                    IsPasswordMatchingCrossValidator("password", "confirmPassword", "passwordMissMatch")
                ])
            }
        };
    }
}
