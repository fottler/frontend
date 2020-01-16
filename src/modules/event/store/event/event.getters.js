import SSList from "@/core/SSList";
import ArrayUtil from "@/core/utilities/ArrayUtil";
import ListConfig from "@/config/ListConfig";
import {getField} from "vuex-map-fields";

const getters = {
    foodString(state){
        return ArrayUtil.chosenOptionsToString(ListConfig.food, state.newEvent.food_preferences);
    },
    drinksString(state){
        return ArrayUtil.chosenOptionsToString(ListConfig.drinks, state.newEvent.drink_preferences);
    },
    membersString(state){
        const
            males = state.newEvent.males_number,
            females = state.newEvent.females_number,
            total = parseInt(males) + parseInt(females);

        //todo single, plural
        return 'Всего '+total+': '+males+' мужчин, '+females+' женщин';
    },
    pictureUrl: (state, getters) => (id) => {
        const event = getters.getById(id);

        return Event.bigPictureUrl(event.picture);
    },


    getByIdWithoutError: (state, getters) => (id) => {
        try{
            return getters.getById(id);
        }
        catch(error){
            if ( !(error instanceof ReferenceError) ) throw error;
        }
        return null;
    },
    getById: (state) => (id) => {
        return SSList.getById(state.events, state.cache, id);
    },
    getAllByIds: (state) => (ids) => {
        return SSList.getAllByIds(state.events, state.cache, ids);
    },
    getNewEventField(state){
        return getField(state.newEvent);
    }
};
export default getters;