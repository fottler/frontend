import state from './app.state'
import getters from './app.getters'
import actions from './app.actions'
import mutations from './app.mutations'

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}