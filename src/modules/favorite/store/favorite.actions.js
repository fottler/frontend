import {
    addToFavorites,
    removeFromFavorites,
    addId, removeId, resetFilter, chooseFilterType, loadAll
} from "@/store/types";
import Event from "@/modules/event/models/Event";

const actions = {
    async [ loadAll ](context){
        return await Event.ajaxActionSetAll(context, async()=>{
            return await Event.getFavorite({...context.state.filter})
        });
    },
    [ addToFavorites ]({ dispatch, commit }, eventId){
        if(dispatch('event/'+addToFavorites, eventId, {root:true})){
            commit(addId, eventId);
        }
    },
    [ removeFromFavorites ]({ dispatch, commit }, eventId){
        if(dispatch('event/'+removeFromFavorites, eventId, {root:true})){
            commit(removeId, eventId);
        }
    },
    [ chooseFilterType ]({ dispatch, commit }, type){
        commit(resetFilter);
        commit(chooseFilterType, type);
        dispatch(loadAll);
    }
};
export default actions;






