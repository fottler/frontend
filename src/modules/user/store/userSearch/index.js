import state from './userSearch.state'
import getters from './userSearch.getters'
import actions from './userSearch.actions'
import mutations from './userSearch.mutations'
import baseState from "@/store/baseUser/baseUser.state";
import baseGetters from "@/store/baseUser/baseUser.getters";
import baseActions from "@/store/baseUser/baseUser.actions";
import baseMutations from "@/store/baseUser/baseUser.mutations";

export default {
    namespaced: true,
    state: {...baseState, ...state},
    getters: {...baseGetters, ...getters},
    actions: {...baseActions, ...actions},
    mutations: {...baseMutations, ...mutations}
}