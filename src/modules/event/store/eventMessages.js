import state from '../../message/store/message.state'
import getters from '../../message/store/message.getters'
import actions from '../../message/store/message.actions'
import mutations from '../../message/store/message.mutations'
import EventMessage from "@/modules/event/models/EventMessage";

export default {
    namespaced: true,
    state,
    getters,
    actions: actions(EventMessage),
    mutations
}