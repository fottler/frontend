import {open, close, changeUser} from "@/store/types";
import {
    closeChat,
    closeMap,
    closeMembers,
    openChat,
    openMap,
    openMembers
} from "@/modules/event/store/event/event.types";
import Vue from "vue";

const mutations = {
    [ changeUser ](state, userId){
        state.currentUserId = userId;
    },
    [ open ](state, eventId){
        Vue.set(state.all, state.currentUserId, {
            openedEventId: eventId
        });
    },
    [ close ](state){
        Vue.set(currentEvent(state), 'openedEventId', null);
    },
    [ openChat ](state){
        Vue.set(currentEvent(state), 'chatIsOpened', true);
    },
    [ closeChat ](state){
        Vue.set(currentEvent(state), 'chatIsOpened', false);
    },
    [ openMembers ](state){
        Vue.set(currentEvent(state), 'membersIsOpened', true);
    },
    [ closeMembers ](state){
        Vue.set(currentEvent(state), 'membersIsOpened', false);
    },
    [ openMap ](state){
        Vue.set(currentEvent(state), 'mapIsOpened', true);
    },
    [ closeMap ](state){
        Vue.set(currentEvent(state), 'mapIsOpened', false);
    }
};
export default mutations;


function currentEvent(state){
    return state.all[state.currentUserId];
}
