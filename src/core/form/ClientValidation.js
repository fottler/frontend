import * as yup from "yup";
import Constants from "@/core/Constants";

export default class ClientValidation {

    static run(rules, model){
        const schema = yup.object().shape(rules);

        try {
            schema.validateSync(
                this.getFieldsToValidate(rules, model),
                {abortEarly: false});

            return {
                status: Constants.STATUS_SUCCESS
            };
        } catch (error) {
            return {
                status: Constants.STATUS_ERROR,
                errors: this.fromYupErrors(error)
            };
        }
    }
    static getFieldsToValidate(rules, model){
        const result = {};

        Object.keys(rules).forEach((name)=>{
            result[name] = model[name];
        });
        return result;
    }
    static fromYupErrors(errors){
        const result = {};

        errors.inner.forEach((item)=>{
            result[item.path] = result[item.path] || item.message;
        });
        return result;
    }


}
