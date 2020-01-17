import {add, addAll, load, set} from "@/store/types";
import SSList from "@/core/SSList";
import {
    addToCache,
    acceptEventRequest,
    removeEventRequest,
    rejectEventRequest
} from "@/modules/user/store/users/users.types";
import User from "@/modules/user/models/User";
import VuexFormHelper from "@/core/form/VuexFormHelper";
import {acceptRequest, rejectRequest} from "@/modules/event/store/event/event.types";

const actions = {
    async [ load ]({ dispatch }, id){
        const result = await User.getOne(id);

        if(VuexFormHelper.isSuccess(result.status)){
            result.user = User.formatAfterLoad(result.user);
            dispatch(set, result.user);
            return result.user;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    },
    async [ acceptEventRequest ]({ getters, dispatch, commit }, {userId, eventId}){
        const
            result = await dispatch('event/'+acceptRequest, {eventId, userId}, {root:true}),
            user = getters.getById(userId);

        if(result){
            commit(removeEventRequest, {userId, eventId});
            dispatch('eventUsers/'+add, {eventId, user}, {root:true});
        }
    },
    async [ rejectEventRequest ]({ dispatch, commit }, {userId, eventId}){
        const result = await dispatch('event/'+rejectRequest, {eventId, userId}, {root:true});

        if(result){
            commit(removeEventRequest, {userId, eventId});
        }
    },


    [ set ]({ commit, state }, user){
        SSList.set(state.users, state.cache, user,
            (index, user)=>commit(set, {index, user}),
            (user)=>commit(add, {user}),
            (key, value)=>commit(addToCache, {key, value})
        );
    },
    [ addAll ]({ commit, state }, users){
        SSList.addAll(state.users, state.cache, users,
            (index, user)=>commit(set, {index, user}),
            (user)=>commit(add, {user}),
            (key, value)=>commit(addToCache, {key, value})
        );
    },
};
export default actions;






