import {loadAll, submit} from "@/store/types";
import {add, setAll} from "@/store/types";
import EventCategory from "@/modules/eventCategory/models/EventCategory";
import FormHelper from "@/store/FormHelper";
import {resetNewCategory} from "@/modules/eventCategory/store/eventCategory.types";

const actions = {
    async [ loadAll ]({ commit }){
        const result = await EventCategory.getAll();

        if(FormHelper.isSuccess(result.status)){
            commit(setAll, result.categories);
            return true;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    },
    async [ submit ]({ commit, state }){
        if(FormHelper.validateOnClient(commit, state.newCategory, EventCategory.validationRules.add)){
            const result = await FormHelper.save(commit, state.newCategory, EventCategory.add);

            if(result){
                commit(add, result.category);
                commit(resetNewCategory);
                return true;
            }
        }
        return false;
    }
};
export default actions;





