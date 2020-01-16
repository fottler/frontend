import Constants from "@/core/Constants";
import * as yup from "yup";

export default {
    data(){
        return {
            errors: {}
        }
    },
    methods: {
        /**
         * @param rules
         * @param onSuccess
         * @param [modelProperty] - property in .data where fields data is stored
         */
        validateOnClient(rules, onSuccess, modelProperty){
            const schema = yup.object().shape(rules);
            
            try {
                schema.validateSync(
                    this.getFieldsToValidate(rules, modelProperty),
                    {
                        abortEarly: false
                    });
                this.clearErrors();
                onSuccess();

            } catch (error) {
                this.setErrors(
                    this.fromYupErrors(error)
                );
            }
        },
        serverResultHandler(result, onSuccess){
            if(result.status === Constants.STATUS_SUCCESS){
                this.clearErrors();
                onSuccess(result);
            }
            else if(result.errors){
                this.setErrors(result.errors);
            }
        },


        getFieldsToValidate(rules, modelProperty){
            const result = {};

            Object.keys(rules).forEach((name)=>{
                const data = modelProperty!==undefined ? modelProperty : this;

                result[name] = data[name];
            });
            return result;
        },
        fromYupErrors(errors){
            const result = {};

            errors.inner.forEach((item)=>{
                result[item.path] = result[item.path] || item.message;
            });
            return result;
        },
        clearErrors(){
            this.errors = {};
        },
        setErrors(errors){
            this.errors = errors;
        }
    },
}