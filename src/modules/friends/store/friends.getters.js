
const getters = {
    getAllRequests(state, getters, rootState, rootGetters){
        return rootGetters['users/getAllByIds'](state.requestIds);
    }
};
export default getters;