import state from './myMessages.state'
import getters from './myMessages.getters'
import actions from './myMessages.actions'
import mutations from './myMessages.mutations'
import baseState from '@/store/baseEvent/baseEvent.state'
import baseActions from "@/store/baseEvent/baseEvent.actions";
import baseGetters from "@/store/baseEvent/baseEvent.getters";
import baseMutations from '@/store/baseEvent/baseEvent.mutations'

export default {
    namespaced: true,
    state: {...baseState, ...state},
    getters: {...baseGetters, ...getters},
    actions: {...baseActions, ...actions},
    mutations: {...baseMutations, ...mutations}
}