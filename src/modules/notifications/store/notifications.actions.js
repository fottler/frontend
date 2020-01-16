import {
    loadAll,
    resetFilter, setAll, chooseFilterType
} from "@/store/types";
import FormHelper from "@/store/FormHelper";
import Notification from '@/modules/notifications/models/Notification'
import {readAllNotifications} from "@/modules/user/store/user/user.types";

const actions = {
    async [ loadAll ]({ dispatch, commit, state }){
        const result = await Notification.getAll(state.filter);

        if(FormHelper.isSuccess(result.status)){
            commit(setAll, result.notifications);
            dispatch('user/'+readAllNotifications, null, {root:true});
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






