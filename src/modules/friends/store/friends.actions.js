import {setAll, loadAll, add, set, addAll} from "@/store/types";
import FormHelper from "@/store/FormHelper";
import User from "@/modules/user/models/User";
import {
    acceptRequest,
    loadAllRequests, rejectRequest,
    removeRequest, sendRequest,
    setAllRequests,
    setRequestAmount
} from "@/modules/friends/store/friends.types";

const actions = {
    async [ loadAll ]({ dispatch, commit }){
        const result = await User.getAll({
            status: User.friendStatuses.friend
        });

        if(FormHelper.isSuccess(result.status)){
            dispatch(setAll, result.users);
            commit(setRequestAmount, result.request_amount);
            return true;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    },
    async [ loadAllRequests ]({ dispatch, commit }){
        const result = await User.getAll({
            status: User.friendStatuses.requestToMe
        });

        if(FormHelper.isSuccess(result.status)){
            dispatch(setAllRequests, result.users);
            commit(setRequestAmount, result.users.length);
            return true;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    },
    async [ sendRequest ]({ dispatch }, user){
        const result = await User.changeFriendStatus(user.id, User.friendStatuses.requestFromMe);

        if(FormHelper.isSuccess(result.status)){
            dispatch('users/'+set, result.user, {root:true});
            return true;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    },
    async [ acceptRequest ]({ dispatch, commit }, user){
        const result = await User.changeFriendStatus(user.id, User.friendStatuses.friend);

        if(FormHelper.isSuccess(result.status)){
            dispatch(add, result.user);
            commit(removeRequest, result.user);
            return true;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    },
    async [ rejectRequest ]({ dispatch, commit }, user){
        const result = await User.changeFriendStatus(user.id, User.friendStatuses.none);

        if(FormHelper.isSuccess(result.status)){
            dispatch('users/'+set, result.user, {root:true});
            commit(removeRequest, result.user);
            return true;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    },


    [ setAllRequests ]({ dispatch, commit }, users){
        commit(setAllRequests, users);
        dispatch('users/'+addAll, users, {root:true});
    }
};
export default actions;






