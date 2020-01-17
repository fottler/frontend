import {
    add,
    addAll,
    addToFavorites,
    apply, load,
    removeFromFavorites,
    set, setError,
    submit,
    updatePicture
} from "@/store/types";
import SSList from "@/core/SSList";
import {acceptRequest, addToCache, rejectRequest, resetNewEvent} from "@/modules/event/store/event/event.types";
import Event from "@/modules/event/models/Event";
import VuexFormHelper from "@/core/form/VuexFormHelper";

const actions = {
    async [ load ]({ dispatch }, id){
        const result = await Event.getOne(id);

        if(VuexFormHelper.isSuccess(result.status)){
            result.event = Event.formatAfterLoad(result.event);
            dispatch(set, result.event);
            return result.event;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    },
    async [ apply ](context, eventId){
        return await Event.ajaxActionSet(context, async()=>{
            return await Event.apply(eventId)
        });
    },
    async [ addToFavorites ](context, eventId){
        return await Event.ajaxActionSet(context, async()=>{
            return await Event.addToFavorites(eventId)
        });
    },
    async [ removeFromFavorites ](context, eventId){
        return await Event.ajaxActionSet(context, async()=>{
            return await Event.removeFromFavorites(eventId)
        });
    },
    async [ acceptRequest ](context, {eventId, userId}){
        const result = await Event.acceptRequest(eventId, userId);

        if(VuexFormHelper.isSuccess(result.status)){
            return true;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    },
    async [ rejectRequest ](context, {eventId, userId}){
        const result = await Event.rejectRequest(eventId, userId);

        if(VuexFormHelper.isSuccess(result.status)){
            return true;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    },
    async [ submit ]({ dispatch, commit, state }){
        const newEvent = Event.formatBeforeSave(state.newEvent);

        if(VuexFormHelper.validateOnClient(commit, state.newEvent, Event.validationRules.add)){
            const result = await VuexFormHelper.save(commit, newEvent, Event.add);

            if(result){
                result.event = Event.formatAfterLoad(result.event);
                dispatch(set, result.event);
                commit(resetNewEvent);
                return true;
            }
        }
        return false;
    },
    [ updatePicture ]({ commit }, image){
        commit(setError, {
            picture: null
        });
        commit(updatePicture, image);
    },
    [ setError ]({ commit }, error){
        commit(setError, error);
    },


    [ set ]({ commit, state }, event){
        SSList.set(state.events, state.cache, event,
            (index, event)=>commit(set, {index, event}),
            (event)=>commit(add, {event}),
            (key, value)=>commit(addToCache, {key, value})
        );
    },
    [ addAll ]({ commit, state }, events){
        SSList.addAll(state.events, state.cache, events,
            (index, event)=>commit(set, {index, event}),
            (event)=>commit(add, {event}),
            (key, value)=>commit(addToCache, {key, value})
        );
    },
};
export default actions;






