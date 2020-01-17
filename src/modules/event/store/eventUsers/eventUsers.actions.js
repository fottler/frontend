import {setAll, loadAll, add, set, addAll} from "@/store/types";
import User from "@/modules/user/models/User";
import VuexFormHelper from "@/core/form/VuexFormHelper";

const actions = {
    async [ loadAll ]({ dispatch }, eventId){
        const result = await User.getByEvent(eventId);

        if(VuexFormHelper.isSuccess(result.status)){
            result.users = User.formatAllAfterLoad(result.users);
            dispatch(setAll, {
                eventId,
                users: result.users
            });
            return true;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    },


    [ setAll ]({ dispatch, commit }, {eventId, users}){
        commit(setAll, {eventId, users});
        dispatch('users/'+addAll, users, {root:true});
    },
    [ add ]({ dispatch, commit }, {eventId, user}){
        commit(add, {eventId, user});
        dispatch('users/'+set, user, {root:true});
    }
};
export default actions;






