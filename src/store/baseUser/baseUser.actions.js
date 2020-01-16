import {setAll, add, set, addAll} from "@/store/types";

const actions = {
    [ setAll ]({ dispatch, commit }, users){
        commit(setAll, users);
        dispatch('users/'+addAll, users, {root:true});
    },
    [ add ]({ dispatch, commit }, user){
        commit(add, user);
        dispatch('users/'+set, user, {root:true});
    }
};
export default actions;






