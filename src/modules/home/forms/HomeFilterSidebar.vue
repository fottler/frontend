<template>
    <Sidebar class="right-sidebar w-100"
             :headline="sidebarHeadline(sidebar.type)"
             v-model="sidebar.shown">

        <div v-show="sidebarIs(sidebar.order.type)">
            <input-list :options="options.filter.order"
                        v-model.lazy="order"
                        name="order"
                        type="radio"
                        label-class="wide bb"></input-list>
        </div>
        <div v-show="sidebarIs(sidebar.category.type)">
            <input-list :options-value-prop-type="integer"
                        options-caption-prop-name="name"
                        :options="categories"
                        v-model.lazy="category"
                        name="category"
                        type="checkbox"
                        label-class="wide bb"></input-list>
        </div>
        <div v-show="sidebarIs(sidebar.drink_preferences.type)">
            <input-list :options="options.drinks"
                        v-model.lazy="drink_preferences"
                        name="drink_preferences"
                        type="radio"
                        label-class="wide bb"></input-list>
        </div>
        <div v-show="sidebarIs(sidebar.food_preferences.type)">
            <input-list :options="options.food"
                        v-model.lazy="food_preferences"
                        name="food_preferences"
                        type="radio"
                        label-class="wide bb"></input-list>
        </div>
    </Sidebar>
</template>

<script>
    import InputList from "@/components/forms/InputList";
    import Sidebar from "@/components/common/Sidebar";
    import ListConfig from "@/config/ListConfig";
    import { createHelpers } from 'vuex-map-fields';
    import { createNamespacedHelpers } from 'vuex'
    import ObjectUtil from "@/core/utilities/ObjectUtil";
    import Constants from "@/core/Constants";

    const { mapState: mapCategoryState } = createNamespacedHelpers('eventCategory');
    const { mapFields } = createHelpers({
        getterType: 'home/getEditableFilterField',
        mutationType: 'home/updateEditableFilterField',
    });

    export default {
        name: 'HomeFilterSidebar',
        components: {Sidebar, InputList},
        props: {
            sidebar: Object
        },
        computed: {
            options: ()=>ListConfig,
            integer: ()=>Constants.INTEGER,
            ...mapCategoryState(['categories']),
            ...mapFields(['order', 'category', 'food_preferences', 'drink_preferences'])
        },
        methods: {
            sidebarIs(type){
                return this.sidebar.type === type;
            },
            findSidebarByType(type){
                return Object.values(this.sidebar).find(function(item){
                    return ObjectUtil.isObject(item) && item.type === type;
                });
            },
            sidebarHeadline(type){
                const sidebarObj = this.findSidebarByType(type);

                return sidebarObj ? sidebarObj.headline : '';
            }
        }
    }
</script>
