const getters = {
    openedEvent(state){
        return state.all[state.currentUserId] || null;
    },
    openedEventId(state, getters){
        return getters.openedEvent && getters.openedEvent.openedEventId;
    },
    isAnyEventOpened(state, getters){
        return getters.openedEventId !== null;
    },
    mapIsOpened(state, getters){
        return getters.openedEvent && getters.openedEvent.mapIsOpened;
    },
    chatIsOpened(state, getters){
        return getters.openedEvent && getters.openedEvent.chatIsOpened;
    },
    membersIsOpened(state, getters){
        return getters.openedEvent && getters.openedEvent.membersIsOpened;
    }
};
export default getters;
