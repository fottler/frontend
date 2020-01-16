import {getField} from "vuex-map-fields";

const getters = {
    getNewFeedbackField(state){
        return getField(state.newFeedback);
    }
};
export default getters;