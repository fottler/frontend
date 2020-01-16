import SSList from "@/core/SSList";
import ArrayUtil from "@/core/utilities/ArrayUtil";
import ListConfig from "@/config/ListConfig";
import User from "@/modules/user/models/User";

const getters = {
    food: (state, getters) => (id) => {
        const user = getters.getById(id);

        return ArrayUtil.getChosenOptions(ListConfig.food, user.food_preferences);
    },
    drinks: (state, getters) => (id) => {
        const user = getters.getById(id);

        return ArrayUtil.getChosenOptions(ListConfig.drinks, user.drink_preferences);
    },
    avatarUrl: (state, getters) => (id) => {
        const user = getters.getById(id);

        return User.bigAvatarUrl(user.avatar);
    },
    smallAvatarUrl: (state, getters) => (id) => {
        const user = getters.getById(id);

        return User.smallAvatarUrl(user.avatar);
    },
    
    
    isFriend: (state, getters) => (id) => {
        const user = getters.getById(id);

        return user.friend_status === User.friendStatuses.friend;
    },
    isNoFriendAndNoRequest: (state, getters) => (id) => {
        const user = getters.getById(id);

        return user.friend_status === User.friendStatuses.none;
    },
    sentFriendRequestToMe: (state, getters) => (id) => {
        const user = getters.getById(id);

        return user.friend_status === User.friendStatuses.requestToMe;
    },


    getByIdWithoutError: (state, getters) => (id) => {
        try{
            return getters.getById(id);
        }
        catch(error){
            if ( !(error instanceof ReferenceError) ) throw error;
        }
        return null;
    },
    idExists: (state) => (id) => {
        return SSList.idExists(state.cache, id);
    },
    getById: (state) => (id) => {
        return SSList.getById(state.users, state.cache, id);
    },
    getAllByIds: (state) => (ids) => {
        return SSList.getAllByIds(state.users, state.cache, ids);
    }
};
export default getters;