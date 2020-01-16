import {addToLoader, hideMenu, removeFromLoader, showCriticalError, showMenu} from "@/store/app/app.types";

const mutations = {
    [ showMenu ](state){
        state.menuIsShown = true;
    },
    [ hideMenu ](state){
        state.menuIsShown = false;
    },

    [ addToLoader ](state){
        //todo state.loadersNumber++;
    },
    [ removeFromLoader ](state){
        state.loadersNumber = Math.max(0, state.loadersNumber-1);
    },

    [ showCriticalError ](state){
        state.criticalErrorOccurred = true;
    },
};
export default mutations;
