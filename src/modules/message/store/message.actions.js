import VuexFormHelper from "@/core/form/VuexFormHelper";
import {submit} from "@/store/types";
import {
    addLocal, addNew,
    addOld, incRequestId, initMessages,
    loadNew,
    loadOld, newTimeout, oldIsLoading, oldIsNotLoading,
    removeAllLocal,
    resetNewMessage, stopLoadingNew
} from "@/modules/message/store/message.types";

function actions(api){
    return {
        async [ loadOld ]({ commit, getters, state }){
            if(state.oldIsLoading){
                return;
            }
            commit(oldIsLoading);

            const
                oldestMessageId = getters.oldestMessageId,
                result = await api.getOlder(state.currentId, oldestMessageId);

            if(VuexFormHelper.isSuccess(result.status)){
                commit(addOld, result.messages);
            }
            commit(oldIsNotLoading);
        },
        async [ submit ]({ dispatch, commit, getters, state }){
            const messageText = getters.newMessage.text;

            if(!messageText){
                return false;
            }

            commit(incRequestId);
            dispatch(stopLoadingNew);

            dispatch(addLocal);
            commit(resetNewMessage);

            const requestId = state.lastRequestId;
            await api.add(state.currentId, messageText);

            if(requestId === state.lastRequestId){
                dispatch(loadNew)
            }
        },
        async [ loadNew ]({ dispatch, commit, getters, state }){
            commit(incRequestId);

            const
                requestId = state.lastRequestId,
                newestMessageId = getters.newestMessageId,
                result = await api.getNewer(state.currentId, newestMessageId);

            if(requestId !== state.lastRequestId){
                return;
            }

            if(VuexFormHelper.isSuccess(result.status)){
                commit(removeAllLocal);
                commit(addNew, result.messages);
            }

            const timerId = setTimeout(()=>dispatch(loadNew), state.interval);
            commit(newTimeout, timerId);
        },
        [ addLocal ]({ commit, getters, rootState }){
            const
                user = rootState.user.user,
                message = {
                    ...getters.newMessage,
                    datetime: Date.now(),
                    is_local: true,
                    user_id: user.id
                };

            commit(addLocal, message);
        },
        [ stopLoadingNew ]({ state }){
            clearTimeout(state.timerId);
        },
        [ initMessages ]({ commit }, currentId){
            commit(initMessages, currentId);
        }
    };
}

export default actions;






