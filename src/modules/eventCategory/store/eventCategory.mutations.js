import {reset, setAll, add, clearErrors, setErrors} from "@/store/types";
import {updateField} from "vuex-map-fields";
import EventCategory from "@/modules/eventCategory/models/EventCategory";
import {resetNewCategory} from "@/modules/eventCategory/store/eventCategory.types";

const mutations = {
    [ setAll ](state, categories){
        state.categories = categories;
    },
    [ reset ](state){
        state.categories = [];
    },
    [ add ](state, category){
        state.categories.push(category);
    },
    [ clearErrors ](state){
        state.errors = {};
    },
    [ setErrors ](state, errors){
        state.errors = errors;
    },
    [ resetNewCategory ](state){
        state.newCategory = EventCategory.reset();
    },


    updateNewCategoryField(state, field) {
        updateField(state.newCategory, field);
    }
};
export default mutations;