import state from './event.state'
import getters from './event.getters'
import actions from './event.actions'
import mutations from './event.mutations'

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}