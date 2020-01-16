import Vue from "vue";
import {
    addNew,
    addOld,
    removeAllLocal,
    resetNewMessage,
    initMessages, addLocal, incRequestId, newTimeout, oldIsLoading, oldIsNotLoading
} from "@/modules/message/store/message.types";
import {updateField} from "vuex-map-fields";
import Message from "@/modules/message/models/Message";
import Constants from "@/core/Constants";

const mutations = {
    [ resetNewMessage ](state){
        const id = state.currentId;

        state.all[id].newMessage = Message.reset();
    },
    [ removeAllLocal ](state){
        const id = state.currentId;

        state.all[id].messages = state.all[id].messages.filter(message=>!message.is_local);
    },
    [ addOld ](state, messages){
        const id = state.currentId;

        state.lastLoadDirection = Constants.TOP;
        state.all[id].messages.unshift(...messages);
    },
    [ addNew ](state, messages){
        const id = state.currentId;

        state.lastLoadDirection = Constants.BOTTOM;
        state.all[id].messages.push(...messages);
    },
    [ addLocal ](state, message){
        const id = state.currentId;

        state.all[id].messages.push(message);
    },


    [ oldIsLoading ](state){
        state.oldIsLoading = true;
    },
    [ oldIsNotLoading ](state){
        state.oldIsLoading = false;
    },
    [ incRequestId ](state){
        state.lastRequestId++;
    },
    [ newTimeout ](state, timerId){
        state.timerId = timerId;
    },
    [ initMessages ](state, id){
        state.currentId = id;

        if(!state.all.hasOwnProperty(id)){
            Vue.set(state.all, id, {
                newMessage: Message.reset(),
                messages: []
            });
        }
    },


    updateNewMessageField(state, field) {
        const id = state.currentId;
        updateField(state.all[id].newMessage, field);
    }
};
export default mutations;