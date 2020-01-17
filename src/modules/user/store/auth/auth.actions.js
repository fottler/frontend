import VuexFormHelper from "@/core/form/VuexFormHelper";
import User from "@/modules/user/models/User";
import {initAuth, login, logout, submitLogin1, submitLogin2} from "@/modules/user/store/auth/auth.types";
import {resetFields, setErrors} from "@/store/types";
import router from '@/router'
import {showCriticalError} from "@/store/app/app.types";
import TokenAuth from "@/core/TokenAuth";

const actions = {
    [ initAuth ](){
        return TokenAuth.init();
    },
    [ login ](context, {accessToken, refreshToken}){
        TokenAuth.login(accessToken, refreshToken);
    },
    [ logout ](){
        TokenAuth.logout();
        window.location.reload();
    },

    //todo remove
    'login2'({ commit }, code){
        commit('login2', code);
    },

    async [ submitLogin1 ]({ dispatch, commit, state }){
        if(VuexFormHelper.validateOnClient(commit, {phone: state.phone}, User.validationRules.login1)){
            const result = await User.login1(state.phone);

            if(VuexFormHelper.isHttpError(result.status)){
                //todo global handler should be used for this
            }
            else if(VuexFormHelper.isError(result.status)){
                if(result.errors === 'Verification code has already been sent'){
                    commit(setErrors, {
                        code: 'Sms с кодом уже было отправлено'
                    });
                    router.push('/login2');
                }
                else{
                    commit(setErrors, result.errors);
                }
            }
            else if(VuexFormHelper.isSuccess(result.status)){
                //todo remove
                dispatch('login2', result.code);

                router.push('/login2');
            }
        }
    },
    async [ submitLogin2 ]({ dispatch, commit, state }){
        const userData = {
            phone: state.phone,
            code: state.code
        };

        if(VuexFormHelper.validateOnClient(commit, userData, User.validationRules.login2)){
            const result = await User.login2(userData);

            if(VuexFormHelper.isHttpError(result.status)){
                //todo global handler should be used for this
                return false;
            }
            else if(result.error){
                if(result.error === 'invalid_credentials'){
                    commit(setErrors, {
                        code: 'Не правильный код'
                    });
                }
                else{
                    dispatch('app/'+showCriticalError, null, {root:true});
                }
                return false;
            }
            else{
                commit(resetFields);
                return result;
            }
        }
    }
};
export default actions;




