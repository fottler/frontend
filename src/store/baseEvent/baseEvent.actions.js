import {setAll, open, close, add, set, addAll} from "@/store/types";
import {
    closeChat,
    closeMap,
    closeMembers,
    openChat,
    openMap,
    openMembers
} from "@/modules/event/store/event/event.types";

const actions = {
    [ open ]({ commit }, eventId){
        commit(open, eventId);
    },
    [ close ]({ commit }){
        commit(close);
    },
    [ openChat ]({ commit }){
        commit(openChat);
    },
    [ closeChat ]({ commit }){
        commit(closeChat);
    },
    [ openMembers ]({ commit }){
        commit(openMembers);
    },
    [ closeMembers ]({ commit }){
        commit(closeMembers);
    },
    [ openMap ]({ commit }){
        commit(openMap);
    },
    [ closeMap ]({ commit }){
        commit(closeMap);
    },


    [ setAll ]({ dispatch, commit }, events){
        commit(setAll, events);
        dispatch('event/'+addAll, events, {root:true});
    },
    [ add ]({ dispatch, commit }, event){
        commit(add, event);
        dispatch('event/'+set, event, {root:true});
    }
};
export default actions;



