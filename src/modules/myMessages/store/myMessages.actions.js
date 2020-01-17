import {
    loadAll,
    resetFilter, setAll, chooseFilterType
} from "@/store/types";
import VuexFormHelper from "@/core/form/VuexFormHelper";
import MyMessages from "@/modules/myMessages/models/MyMessages";
import {readAllMessages} from "@/modules/user/store/user/user.types";

const actions = {
    async [ loadAll ]({ dispatch, commit, state }){
        const result = await MyMessages.getAll(state.filter);

        if(VuexFormHelper.isSuccess(result.status)){
            commit(setAll, result.messages);
            dispatch('user/'+readAllMessages, null, {root:true});
            return true;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    },
    [ chooseFilterType ]({ dispatch, commit }, type){
        commit(resetFilter);
        commit(chooseFilterType, type);
        dispatch(loadAll);
    }
};
export default actions;






