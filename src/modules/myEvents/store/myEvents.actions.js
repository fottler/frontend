import {
    loadAll,
    resetFilter, chooseFilterType, showMap, hideMap
} from "@/store/types";
import Event from "@/modules/event/models/Event";

const actions = {
    async [ loadAll ](context){
        return await Event.ajaxActionSetAll(context, async()=>{
            return await Event.getMyEvents({...context.state.filter})
        });
    },
    [ chooseFilterType ]({ dispatch, commit }, type){
        commit(resetFilter);
        commit(chooseFilterType, type);
        dispatch(loadAll);
    },
    [ showMap ]({ commit }){
        commit(showMap);
    },
    [ hideMap ]({ commit }){
        commit(hideMap);
    }
};
export default actions;






