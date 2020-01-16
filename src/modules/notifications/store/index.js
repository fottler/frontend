import state from './notifications.state'
import getters from './notifications.getters'
import actions from './notifications.actions'
import mutations from './notifications.mutations'
import baseState from "@/store/baseEvent/baseEvent.state";
import baseGetters from "@/store/baseEvent/baseEvent.getters";
import baseActions from "@/store/baseEvent/baseEvent.actions";
import baseMutations from "@/store/baseEvent/baseEvent.mutations";

export default {
    namespaced: true,
    state: {...baseState, ...state},
    getters: {...baseGetters, ...getters},
    actions: {...baseActions, ...actions},
    mutations: {...baseMutations, ...mutations}
}