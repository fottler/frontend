import {getField} from "vuex-map-fields";
import ArrayUtil from "@/core/utilities/ArrayUtil";
import ListConfig from "@/config/ListConfig";
import Event from "@/modules/event/models/Event";

const getters = {
    foodString(state){
        return Event.foodString(state.editableFilter.food_preferences);
    },
    drinksString(state){
        return Event.drinksString(state.editableFilter.drink_preferences);
    },
    orderString(state){
        return ArrayUtil.chosenOptionsToString(ListConfig.filter.order, [state.editableFilter.order]);
    },


    getEditableFilterField(state){
        return getField(state.editableFilter);
    }
};
export default getters;