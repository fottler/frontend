import {add, set} from "@/store/types";
import Vue from 'vue'
import {addToCache, removeEventRequest} from "@/modules/user/store/users/users.types";

const mutations = {
    [ removeEventRequest ](state, {userId, eventId}){
        const
            index = state.cache[userId],
            requests = state.users[index].event_requests;

        state.users[index].event_requests = requests.filter(item => item.id !== eventId);
    },


    [ add ](state, {user}){
        state.users.push(user);
    },
    [ set ](state, {index, user}){
        Vue.set(state.users, index, user);
    },
    [ addToCache ](state, {key, value}){
        Vue.set(state.cache, key, value);
    }
};
export default mutations;
