import {applyFilter, chooseCategory, hideMap, resetFilter, setCoordinates, showMap} from "@/store/types";
import {updateField} from "vuex-map-fields";
import HomeEventFilter from "@/modules/home/models/HomeEventFilter";

const mutations = {
    [ resetFilter ](state){
        state.filter = state.editableFilter = HomeEventFilter.reset();
    },
    [ chooseCategory ](state, categoryId){
        state.filter.category = state.editableFilter.category = [categoryId];
    },
    [ setCoordinates ](state, {lat, lng}){
        state.filter.lat = state.editableFilter.lat = lat;
        state.filter.lng = state.editableFilter.lng = lng;
    },
    [ applyFilter ](state){
        state.filter = {...state.editableFilter};
    },
    [ showMap ](state){
        state.mapShown = true;
    },
    [ hideMap ](state){
        state.mapShown = false;
    },


    updateEditableFilterField(state, field) {
        updateField(state.editableFilter, field);
    }
};
export default mutations;
