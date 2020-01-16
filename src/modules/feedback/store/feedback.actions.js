import {submit} from "@/store/types";
import FormHelper from "@/store/FormHelper";
import Feedback from "@/modules/feedback/models/Feedback";
import {resetNewFeedback} from "@/modules/feedback/store/feedback.types";

const actions = {
    async [ submit ]({ commit, state }){
        if(FormHelper.validateOnClient(commit, state.newFeedback, Feedback.validationRules.add)){
            if(await FormHelper.save(commit, state.newFeedback, Feedback.add)){
                commit(resetNewFeedback);
                return true;
            }
        }
        return false;
    }
};
export default actions;






