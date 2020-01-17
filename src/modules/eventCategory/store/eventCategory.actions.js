import {add, addAll, loadAll, set, submit} from "@/store/types";
import EventCategory from "@/modules/eventCategory/models/EventCategory";
import VuexFormHelper from "@/core/form/VuexFormHelper";
import {resetNewCategory} from "@/modules/eventCategory/store/eventCategory.types";
import SSList from "@/core/SSList";
import {addToCache} from "@/modules/eventCategory/store/eventCategory.types";

const actions = {
    async [ loadAll ]({ dispatch }){
        const result = await EventCategory.getAll();

        if(VuexFormHelper.isSuccess(result.status)){
            dispatch(addAll, result.categories);
            return true;
        }
        else{
            //todo add call of the global error handler here
            return false;
        }
    },
    async [ submit ]({ dispatch, commit, state }){
        if(VuexFormHelper.validateOnClient(commit, state.newCategory, EventCategory.validationRules.add)){
            const result = await VuexFormHelper.save(commit, state.newCategory, EventCategory.add);

            if(result){
                dispatch(set, result.category);
                commit(resetNewCategory);
                return true;
            }
        }
        return false;
    },


    [ set ]({ commit, state }, category){
        SSList.set(state.categories, state.cache, category,
            (index, category)=>commit(set, {index, category}),
            (category)=>commit(add, {category}),
            (key, value)=>commit(addToCache, {key, value})
        );
    },
    [ addAll ]({ commit, state }, categories){
        SSList.addAll(state.categories, state.cache, categories,
            (index, category)=>commit(set, {index, category}),
            (category)=>commit(add, {category}),
            (key, value)=>commit(addToCache, {key, value})
        );
    },
};
export default actions;






