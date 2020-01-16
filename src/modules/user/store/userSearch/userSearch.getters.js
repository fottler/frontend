import {getField} from "vuex-map-fields";
import Event from "@/modules/event/models/Event";

const getters = {
    foodString(state){
        return Event.foodString(state.editableFilter.food_preferences);
    },
    drinksString(state){
        return Event.drinksString(state.editableFilter.drink_preferences);
    },


    getEditableFilterField(state){
        return getField(state.editableFilter);
    }
};
export default getters;