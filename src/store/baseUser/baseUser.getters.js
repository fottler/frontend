
const getters = {
    getById: (state, getters, rootState, rootGetters) => (id) => {
        return rootGetters['users/getById'](id);
    },
    getAll(state, getters, rootState, rootGetters){
        return rootGetters['users/getAllByIds'](state.userIds);
    }
};
export default getters;