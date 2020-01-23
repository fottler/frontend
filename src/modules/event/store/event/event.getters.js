import SSList from "@/core/SSList";
import {getField} from "vuex-map-fields";
import Event from "@/modules/event/models/Event";

const getters = {
    foodString(state){
        return Event.foodString(state.newEvent.food_preferences);
    },
    drinksString(state){
        return Event.drinksString(state.newEvent.drink_preferences);
    },
    maxMembersString(state){
        const
            males = state.newEvent.max_males_number,
            females = state.newEvent.max_females_number,
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