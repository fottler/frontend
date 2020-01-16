<template>
    <Sidebar class="right-sidebar w-100"
             :headline="sidebarHeadline(sidebar.type)"
             v-model="sidebar.shown">

        <div v-show="sidebarIs(sidebar.food_preferences.type)">
            <input-list :options="options.food"
                        v-model.lazy="food_preferences"
                        name="food_preferences"
                        type="checkbox"
                        label-class="wide bb"></input-list>
        </div>

        <list-row v-show="sidebarIs(sidebar.about.type)"
                  class="without-padding bb">
            <textarea v-model.lazy="about"
                      rows="4"
                      class="w-100"
                      placeholder="Здесь будет рассказ о себе в нескольких предложениях или в одном"></textarea>
        </list-row>
    </Sidebar>
</template>

<script>
    import InputList from "@/components/forms/InputList";
    import Sidebar from "@/components/common/Sidebar";
    import ListConfig from "@/config/ListConfig";
    import { createHelpers } from 'vuex-map-fields';
    import ListRow from "@/components/common/ListRow";
    import ObjectUtil from "@/core/utilities/ObjectUtil";

    const { mapFields } = createHelpers({
        getterType: 'user/getEditableUserField',
        mutationType: 'user/updateEditableUserField'
    });

    export default {
        name: 'ProfileFormSidebar',
        components: {ListRow, Sidebar, InputList},
        props: {
            sidebar: Object
        },
        computed: {
            options: ()=>ListConfig,
            ...mapFields(['food_preferences', 'about'])
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
