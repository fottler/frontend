import {removeRequest, setAllRequests, setRequestAmount} from "@/modules/friends/store/friends.types";

const mutations = {
    [ setRequestAmount ](state, amount){
        state.requestAmount = amount;
    },
    [ removeRequest ](state, user){
        state.requestIds = state.requestIds.filter(id=>id !== user.id);
    },


    [ setAllRequests ](state, users){
        state.requestIds = users.map(item=>item.id);
    }
};
export default mutations;
