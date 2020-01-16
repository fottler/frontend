import state from './users.state'
import getters from './users.getters'
import actions from './users.actions'
import mutations from './users.mutations'

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}