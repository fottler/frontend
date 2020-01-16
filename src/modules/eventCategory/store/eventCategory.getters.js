import ArrayUtil from "@/core/utilities/ArrayUtil";
import {getField} from "vuex-map-fields";

const getters = {
    cache: (state) => {
        const result = {};

        state.categories.forEach((item, i)=>{
            result[item.id] = i;
        });
        return result;
    },
    getById: (state, getters) => (id) => {
        const index = getters.cache[id];

        return state.categories[index];
    },
    getAllByIds: (state, getters) => (ids) => {
        return ids.map(id => getters.getById(id));
    },
    categoriesString: (state, getters) => (ids) => {
        return ArrayUtil.toString(
            getters.getAllByIds(ids),
            'name'
        );
    },


    getNewCategoryField(state){
        return getField(state.newCategory);
    }
};
export default getters;