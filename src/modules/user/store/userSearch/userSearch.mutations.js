import {applyFilter, resetFilter} from "@/store/types";
import {updateField} from "vuex-map-fields";
import UserFilter from "@/modules/user/models/UserFilter";

const mutations = {
    [ resetFilter ](state){
        state.filter = state.editableFilter = UserFilter.reset();
    },
    [ applyFilter ](state){
        state.filter = {...state.editableFilter};
    },


    updateEditableFilterField(state, field) {
        updateField(state.editableFilter, field);
    }
};
export default mutations;
