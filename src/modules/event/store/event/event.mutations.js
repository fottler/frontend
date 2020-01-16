import {add, clearErrors, set, setError, setErrors, updatePicture} from "@/store/types";
import {addToCache, resetNewEvent} from "@/modules/event/store/event/event.types";
import Vue from 'vue'
import {updateField} from "vuex-map-fields";
import Event from "@/modules/event/models/Event";

const mutations = {
    [ clearErrors ](state){
        state.errors = {};
    },
    [ setError ](state, error){
        state.errors = {...state.errors, ...error};
    },
    [ setErrors ](state, errors){
        state.errors = errors;
    },
    [ resetNewEvent ](state){
        state.newEvent = Event.reset();
    },
    [ updatePicture ](state, image) {
        state.newEvent = {...state.newEvent, picture: image};
    },


    [ add ](state, {event}){
        state.events.push(event);
    },
    [ set ](state, {index, event}){
        Vue.set(state.events, index, event);
    },
    [ addToCache ](state, {key, value}){
        Vue.set(state.cache, key, value);
    },
    updateNewEventField(state, field) {
        updateField(state.newEvent, field);
    }
};
export default mutations;
