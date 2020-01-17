import {clearErrors, setErrors} from "@/store/types";
import ClientValidation from "@/core/form/ClientValidation";
import Constants from "@/core/Constants";

export default class VuexFormHelper {

    static validateOnClient(commit, model, rules){
        commit(clearErrors);

        const result = ClientValidation.run(rules, model);

        if(self.isError(result.status)){
            commit(setErrors, result.errors);
            return false;
        }
        return true;
    }
    static async save(commit, model, saveMethod){
        const result = await saveMethod(model);

        //todo global handler should be used for this
        if(self.isHttpError(result.status)) return false;

        if(self.isError(result.status)){
            commit(setErrors, result.errors);
            return false;
        }
        return result;
    }


    static isHttpError(status){
        return status === Constants.STATUS_HTTP_ERROR;
    }
    static isError(status){
        return status === Constants.STATUS_ERROR;
    }
    static isSuccess(status){
        return status === Constants.STATUS_SUCCESS;
    }

}
const self = VuexFormHelper;
