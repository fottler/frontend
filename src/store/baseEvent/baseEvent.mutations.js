import {reset, setAll, add, open, close} from "@/store/types";
import {
    closeChat,
    closeMap,
    closeMembers,
    openChat,
    openMap,
    openMembers
} from "@/modules/event/store/event/event.types";

const mutations = {
    [ reset ](state){
        state.eventIds = [];
    },
    [ open ](state, id){
        state.openedEventId = id;
    },
    [ close ](state){
        state.openedEventId = null;
    },
    [ openChat ](state){
        state.chatIsOpened = true;
    },
    [ closeChat ](state){
        state.chatIsOpened = false;
    },
    [ openMembers ](state){
        state.membersIsOpened = true;
    },
    [ closeMembers ](state){
        state.membersIsOpened = false;
    },
    [ openMap ](state){
        state.mapIsOpened = true;
    },
    [ closeMap ](state){
        state.mapIsOpened = false;
    },


    [ setAll ](state, events){
        state.eventIds = events.map(item=>item.id);
    },
    [ add ](state, event){
        state.eventIds.push(event.id);
    }
};
export default mutations;
