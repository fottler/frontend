import ArrayUtil from "@/core/utilities/ArrayUtil";
import {getField} from "vuex-map-fields";
import SSList from "@/core/SSList";

const getters = {
    categoriesString: (state, getters) => (ids) => {
        return ArrayUtil.toString(
            getters.getAllByIds(ids),
            'name'
        );
    },


    getById: (state) => (id) => {
        return SSList.getById(state.categories, state.cache, id);
    },
    getAllByIds: (state) => (ids) => {
        return SSList.getAllByIds(state.categories, state.cache, ids);
    },
    getNewCategoryField(state){
        return getField(state.newCategory);
    }
};
export default getters;