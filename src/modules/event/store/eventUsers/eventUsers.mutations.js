import {reset, setAll, add} from "@/store/types";
import Vue from "vue";

const mutations = {
    [ reset ](state){
        state.events = {};
    },


    [ setAll ](state, {eventId, users}){
        Vue.set(state.events, eventId, users.map(item=>item.id));
    },
    [ add ](state, {eventId, user}){
        if(!state.events.hasOwnProperty(eventId)){
            Vue.set(state.events, eventId, []);
        }
        state.events[eventId].push(user.id);
    }
};
export default mutations;
