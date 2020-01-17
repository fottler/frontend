import {submit} from "@/store/types";
import VuexFormHelper from "@/core/form/VuexFormHelper";
import Feedback from "@/modules/feedback/models/Feedback";
import {resetNewFeedback} from "@/modules/feedback/store/feedback.types";

const actions = {
    async [ submit ]({ commit, state }){
        if(VuexFormHelper.validateOnClient(commit, state.newFeedback, Feedback.validationRules.add)){
            if(await VuexFormHelper.save(commit, state.newFeedback, Feedback.add)){
                commit(resetNewFeedback);
                return true;
            }
        }
        return false;
    }
};
export default actions;






