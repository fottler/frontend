import {addId, removeId, resetFilter, chooseFilterType} from "@/store/types";
import ArrayUtil from "@/core/utilities/ArrayUtil";
import ListConfig from "@/config/ListConfig";

const mutations = {
    [ addId ](state, id){
        state.eventIds.push(id);
    },
    [ removeId ](state, id){
        ArrayUtil.removeByValue(state.eventIds, id);
    },
    [ resetFilter ](state){
        state.filter = {
            type: ListConfig.filter.all
        };
    },
    [ chooseFilterType ](state, type){
        state.filter.type = type;
    }
};
export default mutations;
