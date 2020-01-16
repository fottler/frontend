import {getField} from "vuex-map-fields";

const getters = {
    data(state){
        return state.all[state.currentId]
    },
    messages(state, getters){
        return getters.data.messages;
    },
    newMessage(state, getters){
        return getters.data.newMessage;
    },
    newestMessageId(state, getters){
        const length = getters.messages.length;

        return length ? getters.messages[length-1].id : null;
    },
    oldestMessageId(state, getters){
        const length = getters.messages.length;

        return length ? getters.messages[0].id : -1;
    },


    getNewMessageField(state){
        const id = state.currentId;
        return getField(state.all[id].newMessage);
    }
};
export default getters;
