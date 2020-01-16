import {clearErrors, setErrors} from "@/store/types";
import {updateField} from "vuex-map-fields";
import Feedback from "@/modules/feedback/models/Feedback";
import {resetNewFeedback} from "@/modules/feedback/store/feedback.types";

const mutations = {
    [ clearErrors ](state){
        state.errors = {};
    },
    [ setErrors ](state, errors){
        state.errors = errors;
    },
    [ resetNewFeedback ](state){
        state.newFeedback = Feedback.reset();
    },


    updateNewFeedbackField(state, field) {
        updateField(state.newFeedback, field);
    }
};
export default mutations;
