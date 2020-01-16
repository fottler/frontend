import {runGeolocation, setError, submit, updatePicture} from "@/store/types";
import FormHelper from "@/store/FormHelper";
import User from "@/modules/user/models/User";
import {loadUserInfo, resetUser, setUser, readAllMessages, readAllNotifications} from "@/modules/user/store/user/user.types";
import Config from "@/config/Config";
import GeoInfo from "@/core/map/google/services/GeoInfo";

const actions = {
    async [ loadUserInfo ]({ commit }){
        const result = await User.getInfo();

        if(FormHelper.isSuccess(result.status)){
            result.user = User.formatAfterLoad(result.user);
            commit(setUser, result.user);
            return true;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    },
    [ setUser ]({ commit }, userInfo){
        commit(setUser, userInfo);
    },
    [ resetUser ]({ commit }){
        commit(resetUser);
    },
    async [ submit ]({ commit, state }){
        if(FormHelper.validateOnClient(commit, state.editableUser, User.validationRules.edit)){
            const result = await FormHelper.save(commit, state.editableUser, User.edit);

            if(result){
                commit(setUser, result.user);
                return true;
            }
        }
        return false;
    },
    [ updatePicture ]({ commit }, image){
        commit(setError, {
            avatar: null
        });
        commit(updatePicture, image);
    },
    [ setError ]({ commit }, error){
        commit(setError, error);
    },
    async [ runGeolocation ]({ commit }){
        const
            {geolocation, locationInfo} = Config.map,
            geoInfo = new GeoInfo(
                geolocation.errorMessages,
                locationInfo.errorMessages,
                geolocation.networkTimeout
            ),
            result = await geoInfo.run();

        geoInfo.destroy();

        if(FormHelper.isSuccess(result.status)){
            commit('updateEditableUserField', {
                path: 'city',
                value: result.city
            });
            commit(setError, {
                geolocation: null
            });
        }
        else{
            commit('updateEditableUserField', {
                path: 'geolocation',
                value: false
            });
            commit(setError, {
                geolocation: result.error
            });
        }
    },
    [ readAllMessages ]({ commit }){
        commit(readAllMessages);
    },
    [ readAllNotifications ]({ commit }){
        commit(readAllNotifications);
    }
};
export default actions;





