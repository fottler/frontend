import {addToLoader, hideMenu, removeFromLoader, showCriticalError, showMenu} from "@/store/app/app.types";

const actions = {
    [ showMenu ]({ commit }){
        commit(showMenu);
    },
    [ hideMenu ]({ commit }){
        commit(hideMenu);
    },

    [ addToLoader ]({ commit }){
        commit(addToLoader);
    },
    [ removeFromLoader ]({ commit }){
        commit(removeFromLoader);
    },

    [ showCriticalError ]({ commit }){
        commit(showCriticalError);
    }

};
export default actions;






