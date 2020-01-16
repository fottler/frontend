import state from './friends.state'
import getters from './friends.getters'
import actions from './friends.actions'
import mutations from './friends.mutations'
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