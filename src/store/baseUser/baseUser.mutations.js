import {reset, setAll, add} from "@/store/types";

const mutations = {
    [ reset ](state){
        state.userIds = [];
    },


    [ setAll ](state, users){
        state.userIds = users.map(item=>item.id);
    },
    [ add ](state, user){
        state.userIds.push(user.id);
    }
};
export default mutations;
