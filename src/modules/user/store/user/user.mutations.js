import {clearErrors, setError, setErrors, updatePicture} from "@/store/types";
import {updateField} from "vuex-map-fields";
import User from "@/modules/user/models/User";
import {readAllMessages, readAllNotifications, resetUser, setUser} from "@/modules/user/store/user/user.types";

const mutations = {
    [ clearErrors ](state){
        state.errors = {};
    },
    [ setError ](state, error){
        state.errors = {...state.errors, ...error};
    },
    [ setErrors ](state, errors){
        state.errors = errors;
    },
    [ resetUser ](state){
        state.user = User.reset();
    },
    [ setUser ](state, user){
        state.editableUser = {...user};
        state.user = {...user};
    },
    [ updatePicture ](state, image) {
        state.editableUser = {...state.editableUser, avatar: image};
    },
    [ readAllMessages ](state){
        state.user.info.unread_messages = 0;
    },
    [ readAllNotifications ](state){
        state.user.info.unread_notifications = 0;
    },


    updateEditableUserField(state, field) {
        updateField(state.editableUser, field);
    }
};
export default mutations;
