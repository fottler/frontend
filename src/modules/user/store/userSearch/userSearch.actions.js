import {loadAll, applyFilter, setAll, resetFilter} from "@/store/types";
import User from "@/modules/user/models/User";
import VuexFormHelper from "@/core/form/VuexFormHelper";

const actions = {
    async [ loadAll ]({ dispatch, state }){
        const result = await User.getAll({...state.filter});

        if(VuexFormHelper.isSuccess(result.status)){
            result.users = User.formatAllAfterLoad(result.users);
            dispatch(setAll, result.users);
            return true;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    },
    [ applyFilter ]({ dispatch, commit }){
        commit(applyFilter);
        dispatch(loadAll);
    },
    [ resetFilter ]({ commit }){
        commit(resetFilter);
    },
};
export default actions;






