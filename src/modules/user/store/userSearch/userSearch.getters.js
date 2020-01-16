import {getField} from "vuex-map-fields";
import ArrayUtil from "@/core/utilities/ArrayUtil";
import ListConfig from "@/config/ListConfig";

const getters = {
    foodString(state){
        return ArrayUtil.chosenOptionsToString(ListConfig.food, state.editableFilter.food_preferences);
    },
    drinksString(state){
        return ArrayUtil.chosenOptionsToString(ListConfig.drinks, state.editableFilter.drink_preferences);
    },


    getEditableFilterField(state){
        return getField(state.editableFilter);
    }
};
export default getters;