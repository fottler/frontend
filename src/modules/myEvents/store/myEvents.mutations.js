import {resetFilter, chooseFilterType, showMap, hideMap} from "@/store/types";
import ListConfig from "@/config/ListConfig";

const mutations = {
    [ resetFilter ](state){
        state.filter = {
            type: ListConfig.filter.all
        };
    },
    [ chooseFilterType ](state, type){
        state.filter.type = type;
    },
    [ showMap ](state){
        state.mapShown = true;
    },
    [ hideMap ](state){
        state.mapShown = false;
    }
};
export default mutations;
