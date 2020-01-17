import {
    loadAll,
    applyFilter,
    chooseCategory,
    resetFilter,
    search,
    setCoordinates,
    runGeolocation,
    showMap, hideMap
} from "@/store/types";
import Event from "@/modules/event/models/Event";
import Geolocation from "@/core/map/Geolocation";
import VuexFormHelper from "@/core/form/VuexFormHelper";
import Config from "@/config/Config";

const actions = {
    async [ loadAll ](context){
        return await Event.ajaxActionSetAll(context, async()=>{
            return await Event.getAll({...context.state.filter})
        });
    },
    async [ chooseCategory ]({ dispatch, commit }, categoryId){
        commit(resetFilter);
        categoryId && commit(chooseCategory, categoryId);
        await dispatch(loadAll);
    },
    async [ search ]({ dispatch, commit }, text){
        commit('updateEditableFilterField', {
            path: 'text',
            value: text
        });
        await dispatch(applyFilter);
    },
    async [ applyFilter ]({ dispatch, commit }){
        commit(applyFilter);
        await dispatch(loadAll);
    },
    [ resetFilter ]({ commit }){
        commit(resetFilter);
    },
    async [ runGeolocation ]({ dispatch }){
        const
            geolocation = new Geolocation(
                Config.map.geolocation.errorMessages,
                Config.map.geolocation.networkTimeout
            ),
            result = await geolocation.run();

        if(VuexFormHelper.isSuccess(result.status)){
            await dispatch(setCoordinates, result);
        }
    },
    async [ setCoordinates ]({ dispatch, commit }, {lat, lng}){
        commit(setCoordinates, {lat, lng});
        await dispatch(loadAll);
    },
    [ showMap ]({ commit }){
        commit(showMap);
    },
    [ hideMap ]({ commit }){
        commit(hideMap);
    },
};
export default actions;






