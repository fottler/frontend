import {add, clearErrors, setErrors, set} from "@/store/types";
import {updateField} from "vuex-map-fields";
import EventCategory from "@/modules/eventCategory/models/EventCategory";
import {resetNewCategory} from "@/modules/eventCategory/store/eventCategory.types";
import {addToCache} from "@/modules/eventCategory/store/eventCategory.types";
import Vue from "vue";

const mutations = {
    [ clearErrors ](state){
        state.errors = {};
    },
    [ setErrors ](state, errors){
        state.errors = errors;
    },
    [ resetNewCategory ](state){
        state.newCategory = EventCategory.reset();
    },


    [ add ](state, {category}){
        state.categories.push(category);
    },
    [ set ](state, {index, category}){
        Vue.set(state.categories, index, category);
    },
    [ addToCache ](state, {key, value}){
        Vue.set(state.cache, key, value);
    },
    updateNewCategoryField(state, field) {
        updateField(state.newCategory, field);
    }
};
export default mutations;