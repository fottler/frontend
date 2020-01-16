import state from './home.state'
import getters from './home.getters'
import actions from './home.actions'
import mutations from './home.mutations'
import baseState from '@/store/baseEvent/baseEvent.state'
import baseActions from "@/store/baseEvent/baseEvent.actions";
import baseGetters from "@/store/baseEvent/baseEvent.getters";
import baseMutations from '@/store/baseEvent/baseEvent.mutations'

export default {
    namespaced: true,
    state: {...baseState, ...state},
    getters: {...baseGetters, ...getters},
    actions: {...baseActions, ...actions},
    mutations: {...baseMutations, ...mutations},
}