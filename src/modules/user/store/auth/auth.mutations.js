import {clearErrors, setErrors, resetFields} from "@/store/types";
import {updateField} from "vuex-map-fields";

const mutations = {
    [ clearErrors ](state){
        state.errors = {};
    },
    [ setErrors ](state, errors){
        state.errors = errors;
    },
    [ resetFields ](state){
        state.phone = '';
        state.code = '';
    },


    //todo remove
    'login2'(state, code){
        state.code = code;
    },


    updateField
};
export default mutations;
