import {loadAll, applyFilter, setAll, resetFilter} from "@/store/types";
import User from "@/modules/user/models/User";
import FormHelper from "@/store/FormHelper";

const actions = {
    async [ loadAll ]({ dispatch, state }){
        const result = await User.getAll({...state.filter});

        if(FormHelper.isSuccess(result.status)){
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






