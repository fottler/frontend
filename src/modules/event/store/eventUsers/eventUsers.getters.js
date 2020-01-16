
const getters = {
    getById: (state, getters, rootState, rootGetters) => (id) => {
        return rootGetters['users/getById'](id);
    },
    getAll: (state, getters, rootState, rootGetters) => (eventId) => {
        const userIds = state.events[eventId];

        return userIds ? rootGetters['users/getAllByIds'](userIds) : [];
    },
    getOwner: (state, getters) => (event) => {
        const users = getters.getAll(event.id);

        return users.find(user => user.id === event.owner_id);
    },
    getAllWithoutOwner: (state, getters) => (event) => {
        const users = getters.getAll(event.id);

        return users.filter(user => user.id !== event.owner_id);
    }
};
export default getters;