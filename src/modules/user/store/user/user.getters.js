import {getField} from "vuex-map-fields";
import ArrayUtil from "@/core/utilities/ArrayUtil";
import ListConfig from "@/config/ListConfig";
import User from "@/modules/user/models/User";

const getters = {
    //user
    food(state){
        return ArrayUtil.getChosenOptions(ListConfig.food, state.user.food_preferences);
    },
    drinks(state){
        return ArrayUtil.getChosenOptions(ListConfig.drinks, state.user.drink_preferences);
    },
    avatarUrl(state){
        return User.avatarUrl(state.user.avatar);
    },
    //editable user
    foodString(state){
        return ArrayUtil.chosenOptionsToString(ListConfig.food, state.editableUser.food_preferences);
    },
    drinksString(state){
        return ArrayUtil.chosenOptionsToString(ListConfig.drinks, state.editableUser.drink_preferences);
    },


    getEditableUserField(state){
        return getField(state.editableUser);
    }
};
export default getters;