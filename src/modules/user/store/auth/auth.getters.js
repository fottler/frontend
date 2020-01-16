import { getField } from 'vuex-map-fields';
import User from "@/modules/user/models/User";

const getters = {
    authStatus(state, getters, rootState){
        const user = rootState.user.user;
        
        return user.auth_status;
    },
    isGuest(state, getters){
        return User.isGuest(getters.authStatus);
    },
    profileIsNotFilled(state, getters){
        return User.profileIsNotFilled(getters.authStatus);
    },
    authorised(state, getters){
        return User.authorised(getters.authStatus);
    },


    getField
};
export default getters;