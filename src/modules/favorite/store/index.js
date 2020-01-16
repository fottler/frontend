import state from './favorite.state'
import getters from './favorite.getters'
import actions from './favorite.actions'
import mutations from './favorite.mutations'
import baseState from "@/store/baseEvent/baseEvent.state";
import baseGetters from "@/store/baseEvent/baseEvent.getters";
import baseActions from "@/store/baseEvent/baseEvent.actions";
import baseMutations from "@/store/baseEvent/baseEvent.mutations";

export default {
    namespaced: true,
    state: {...baseState, ...state},
    getters: {...baseGetters, ...getters},
    actions: {...baseActions, ...actions},
    mutations: {...baseMutations, ...mutations},
}