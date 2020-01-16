const getters = {
    isAnyEventOpened(state){
        return state.openedEventId !== null;
    },
    openedEvent(state, getters){
        return getters.isAnyEventOpened ? getters.getById(state.openedEventId) : {};
    },


    getById: (state, getters, rootState, rootGetters) => (id) => {
        return rootGetters['event/getById'](id);
    },
    getAll(state, getters, rootState, rootGetters){
        return rootGetters['event/getAllByIds'](state.eventIds);
    }
};
export default getters;