import {open, close, changeUser} from "@/store/types";
import {
    closeChat,
    closeMap,
    closeMembers,
    openChat,
    openMap,
    openMembers
} from "@/modules/event/store/event/event.types";

const actions = {
    [ changeUser ]({ commit }, userId){
        commit(changeUser, userId);
    },
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
    }
};
export default actions;



