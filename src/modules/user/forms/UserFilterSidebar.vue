<template>
    <Sidebar class="right-sidebar w-100"
             :headline="sidebarHeadline(sidebar.type)"
             v-model="sidebar.shown">

        <list-row v-show="sidebarIs(sidebar.city.type)"
                  class="bb">

            <input type="text"
                   class="w-100"
                   placeholder="Выберите город"
                   v-model.lazy="city">
        </list-row>
        <div v-show="sidebarIs(sidebar.food_preferences.type)">
            <input-list :options="options.food"
                        v-model.lazy="food_preferences"
                        name="food_preferences"
                        type="radio"
                        label-class="wide bb"></input-list>
        </div>
        <div v-show="sidebarIs(sidebar.drink_preferences.type)">
            <input-list :options="options.drinks"
                        v-model.lazy="drink_preferences"
                        name="drink_preferences"
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
    import ObjectUtil from "@/core/utilities/ObjectUtil";
    import ListRow from "@/components/common/ListRow";

    const { mapFields } = createHelpers({
        getterType: 'userSearch/getEditableFilterField',
        mutationType: 'userSearch/updateEditableFilterField',
    });

    export default {
        name: 'UserFilterSidebar',
        components: {ListRow, Sidebar, InputList},
        props: {
            sidebar: Object
        },
        computed: {
            options: ()=>ListConfig,
            ...mapFields(['city', 'food_preferences', 'drink_preferences'])
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
